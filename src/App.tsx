import React, { useState, useEffect } from 'react';
import Visualization from './components/Visualization';
import { JsonData } from './types';
import responseData1 from './response/another_response.json';
import responseData2 from './response/response.json';
import responseData3 from './response/real_response.json';

interface LLMChunk {
  event?: {
    id?: string;
    choices?: Array<{
      delta: {
        content?: string;
        role?: string;
      };
      finish_reason?: string | null;
    }>;
    model?: string;
    created?: number;
  };
  data?: {
    id: string;
    choices: Array<{
      delta: {
        content?: string;
        role?: string;
      };
      finish_reason: string | null;
    }>;
    model: string;
    created: number;
  };
  timestamp?: number;
}

// === 분석용 유틸 함수들 ===

// 문장 구성 비율
const analyzeSentenceComposition = (text: string) => {
  const nounRegex = /[가-힣]+(은|는|이|가|을|를)/g;
  const verbRegex = /[가-힣]+(다|했다|한다)/g;
  const adjRegex = /[가-힣]+(한|하다|스러운)/g;

  const nounCount = (text.match(nounRegex) || []).length;
  const verbCount = (text.match(verbRegex) || []).length;
  const adjCount = (text.match(adjRegex) || []).length;

  return [
    { type: '명사', count: nounCount },
    { type: '동사', count: verbCount },
    { type: '형용사', count: adjCount },
  ];
};

// Synthetic timestamp 추가 (created 동일할 때 대비)
const addSyntheticTimestamps = (chunks: LLMChunk[]) => {
  let time = Date.now();
  return chunks.map((chunk, idx) => ({
    ...chunk,
    timestamp: chunk.timestamp || time + idx * 80 + Math.random() * 20,
  }));
};

// 딜레이 분포
const calcDelayHistogram = (chunks: LLMChunk[]) => {
  const delays: number[] = [];
  for (let i = 1; i < chunks.length; i++) {
    const prevTime = chunks[i - 1]?.timestamp || 0;
    const currTime = chunks[i]?.timestamp || 0;
    const delay = currTime - prevTime;
    if (delay > 0) delays.push(delay);
  }

  if (delays.length === 0) return [];
  const bins: { [key: string]: number } = {};
  delays.forEach(d => {
    const range = `${Math.floor(d / 50) * 50}-${Math.floor(d / 50) * 50 + 49}`;
    bins[range] = (bins[range] || 0) + 1;
  });
  return Object.entries(bins).map(([range, count]) => ({ range, count }));
};

// 생성속도 누적
const calcGenerationSpeed = (chunks: LLMChunk[]) => {
  const speedData: { time: string; tokensPerSec: number; }[] = [];
  if (chunks.length < 2) return speedData;

  const startTime = chunks[0].timestamp || 0;
  let tokenCount = 0;
  for (let i = 1; i < chunks.length; i++) {
    tokenCount += 1;
    const currentTime = chunks[i].timestamp || 0;
    const elapsedSec = (currentTime - startTime) / 1000;
    if (elapsedSec > 0) {
      speedData.push({
        time: elapsedSec.toFixed(2),
        tokensPerSec: tokenCount / elapsedSec,
      });
    }
  }
  return speedData;
};

// 처리량
const calcThroughput = (chunks: LLMChunk[]) => {
  if (chunks.length < 2) return [];
  const startTime = chunks[0].timestamp || 0;
  const intervals: { [key: string]: number } = {};

  chunks.forEach(chunk => {
    const chunkTime = chunk.timestamp || 0;
    const elapsedSec = Math.floor((chunkTime - startTime) / 1000);
    intervals[elapsedSec] = (intervals[elapsedSec] || 0) + 1;
  });

  return Object.entries(intervals).map(([sec, throughput]) => ({
    time: sec,
    throughput,
  }));
};

// 느려지는 구간 탐지
const detectSlowdown = (chunks: LLMChunk[]) => {
  const delays = [];
  for (let i = 1; i < chunks.length; i++) {
    const prev = chunks[i - 1]?.timestamp || 0;
    const curr = chunks[i]?.timestamp || 0;
    delays.push(curr - prev);
  }

  if (delays.length === 0) return [];
  const avgDelay = delays.reduce((a, b) => a + b, 0) / delays.length;
  return delays.map((d, i) => ({
    index: i,
    delay: d,
    avgDelay,
  }));
};

// === 메인 컴포넌트 ===
const App: React.FC = () => {
  const [data, setData] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const processLLMData = (chunks: LLMChunk[]): JsonData => {
        const processedChunks = addSyntheticTimestamps(chunks);

        let fullContent = '';
        const modelCounts: { [key: string]: number } = {};
        const wordFrequency: { [key: string]: number } = {};

        processedChunks.forEach(chunk => {
          if (chunk.event?.choices?.[0]?.delta?.content) {
            fullContent += chunk.event.choices[0].delta.content;
          }
          if (chunk.data?.choices?.[0]?.delta?.content) {
            fullContent += chunk.data.choices[0].delta.content;
          }

          const model = chunk.event?.model || chunk.data?.model;
          if (model) modelCounts[model] = (modelCounts[model] || 0) + 1;
        });

        const words = fullContent.match(/[가-힣]+/g) || [];
        words.forEach(word => {
          if (word.length > 1)
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        const chartData =
          Object.entries(modelCounts).length > 0
            ? Object.entries(modelCounts).map(([model, count]) => ({
                category: model.replace('Konan-LLM-ENT-', 'Model-'),
                value: count,
              }))
            : [
                { category: 'Total Chunks', value: chunks.length },
                { category: 'Content Length', value: fullContent.length },
                { category: 'Word Count', value: words.length },
              ];

        const wordCloudData = Object.entries(wordFrequency)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 15)
          .map(([text, value]) => ({ text, value }));

        const wordLengthMap: { [key: number]: number } = {};
        words.forEach(w => {
          const len = w.length;
          wordLengthMap[len] = (wordLengthMap[len] || 0) + 1;
        });
        const wordLengthData = Object.entries(wordLengthMap).map(
          ([length, count]) => ({
            length: Number(length),
            count,
          })
        );

        const sentences = fullContent
          .split(/[\.\?\!]\s*/)
          .filter(s => s.length > 0);
        const sentenceLengthMap: { [key: number]: number } = {};
        sentences.forEach(s => {
          const wordCount = (s.match(/[가-힣]+/g) || []).length;
          sentenceLengthMap[wordCount] =
            (sentenceLengthMap[wordCount] || 0) + 1;
        });
        const sentenceLengthData = Object.entries(sentenceLengthMap).map(
          ([length, count]) => ({
            words: Number(length),
            count,
          })
        );

        const delayData = calcDelayHistogram(processedChunks);
        const speedData = calcGenerationSpeed(processedChunks);
        const throughputData = calcThroughput(processedChunks);
        const slowdownData = detectSlowdown(processedChunks);
        const compositionData = analyzeSentenceComposition(fullContent);

        return {
          chartData,
          wordCloudData: wordCloudData.length > 0 ? wordCloudData : [],
          wordLengthData,
          sentenceLengthData,
          compositionData,
          delayData,
          speedData,
          throughputData,
          slowdownData,
        };
      };

      const allResponseData: LLMChunk[] = [
        ...(responseData1 as LLMChunk[]),
        // ...(responseData2 as LLMChunk[]),
        // ...(responseData3 as LLMChunk[]),
      ];

      if (Array.isArray(allResponseData)) {
        const processedData = processLLMData(allResponseData);
        setData(processedData);
      } else {
        throw new Error('Invalid response.json format - expected array');
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Unknown error occurred while processing LLM response data.');
    }
  }, []);

  if (error) {
    return (
      <div role="alert" style={{ color: 'red', padding: '1rem' }}>
        Error loading data: {error}
      </div>
    );
  }

  if (!data) {
    return <div>Loading and processing LLM response data...</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>LLM Response Visualization</h1>
      <p>Analyzing and visualizing LLM streaming response data</p>
      <Visualization data={data} />
    </div>
  );
};

export default App;
