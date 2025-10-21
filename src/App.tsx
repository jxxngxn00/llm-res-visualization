import React, { useState, useEffect } from 'react';
import Visualization from './components/Visualization';
import { JsonData } from './types';
import responseData1 from './response/another_response.json';
import responseData2 from './response/response.json';
import responseData3 from './response/real_response.json'

interface LLMChunk {
  event?: any;
  data?: {
    id: string;
    choices: Array<{
      delta: {
        content: string;
        role?: string;
      };
      finish_reason: string | null;
    }>;
    model: string;
    created: number;
  };
}

const App: React.FC = () => {
  const [data, setData] = useState<JsonData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const responseData = [...responseData1, ...responseData2, ...responseData3];

  useEffect(() => {
    try {

      // LLM 응답 데이터를 시각화 데이터로 변환
      const processLLMData = (chunks: LLMChunk[]): JsonData => {
        // 텍스트 콘텐츠 추출 및 결합
        let fullContent = '';
        const modelCounts: { [key: string]: number } = {};
        const wordFrequency: { [key: string]: number } = {};
        
        chunks.forEach(chunk => {
          // event 타입에서 content 추출
          if (chunk.event?.choices?.[0]?.delta?.content) {
            fullContent += chunk.event.choices[0].delta.content;
          }
          // data 타입에서 content 추출
          if (chunk.data?.choices?.[0]?.delta?.content) {
            fullContent += chunk.data.choices[0].delta.content;
          }
          
          // 모델 카운트
          const model = chunk.event?.model || chunk.data?.model;
          if (model) {
            modelCounts[model] = (modelCounts[model] || 0) + 1;
          }
        });

        console.log('Extracted content:', fullContent); // 디버깅용

        // 단어 빈도 분석 (한글 단어 추출)
        const words = fullContent.match(/[가-힣]+/g) || [];
        words.forEach(word => {
          if (word.length > 1) { // 1글자 단어 제외
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
          }
        });

        console.log('Word frequency:', wordFrequency); // 디버깅용

        // 차트 데이터 생성 (실제 데이터만 사용)
        const chartData = Object.entries(modelCounts).length > 0 
          ? Object.entries(modelCounts).map(([model, count]) => ({
              category: model.replace('Konan-LLM-ENT-', 'Model-'),
              value: count
            }))
          : [
              { category: 'Total Chunks', value: chunks.length },
              { category: 'Content Length', value: fullContent.length },
              { category: 'Word Count', value: words.length }
            ];

        // 워드클라우드 데이터 생성 (실제 단어만 사용, 기본값 없음)
        const wordCloudData = Object.entries(wordFrequency)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 15) // 상위 15개 단어
          .map(([text, value]) => ({ text, value }));

        // 실제 데이터가 없으면 빈 배열 반환
        if (wordCloudData.length === 0) {
          console.warn('No Korean words found in content');
        }

        // 단어 길이 분포
        const wordLengthMap : { [key: number]: number } = {};
        words.forEach( w => {
          const len = w.length;
          wordLengthMap[len] = (wordLengthMap[len] || 0) + 1;
        });
        const wordLengthData = Object.entries(wordLengthMap).map(([length, count]) => ({
          length: Number(length),
          count
        }));
      
        // 문장 길이 분포
        const sentences = fullContent.split(/[\.\?\!]\s*/).filter(s => s.length > 0);
        const sentenceLengthMap : { [key: number]: number } = {};
        sentences.forEach( s => {
          const wordCount = (s.match(/[가-힣]+/g) || []).length;
          sentenceLengthMap[wordCount] = (sentenceLengthMap[wordCount] || 0) + 1;
        });
        const sentenceLengthData = Object.entries(sentenceLengthMap).map(([length, count]) => ({
          words: Number(length),
          count
        }));


        return {
          chartData,
          wordCloudData: wordCloudData.length > 0 ? wordCloudData : [],
          wordLengthData,
          sentenceLengthData
        };
      };

      // const allResponseData = [...responseData1, ...responseData2, ...responseData3];
      const allResponseData = [...responseData2, ...responseData3];

      if (Array.isArray(allResponseData)) {
        const processedData = processLLMData(allResponseData as LLMChunk[]);
        setData(processedData);
      } else {
        throw new Error('Invalid response.json format - expected array');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred while processing LLM response data.');
      }
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

  if (data.wordCloudData.length === 0) {
    return (
      <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem' }}>
        <h1>LLM Response Visualization</h1>
        <p>Analyzing LLM streaming response data</p>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Chart Data Available</h2>
          <p>Word cloud data not available - no Korean words found in the response content.</p>
          <Visualization data={{ ...data, wordCloudData: [{ text: 'No Data', value: 1 }] }} />
        </div>
      </div>
    );
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
