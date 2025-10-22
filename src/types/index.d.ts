export interface ChartDataItem {
  category: string;
  value: number;
}

export interface WordCloudDataItem {
  text: string;
  value: number;
}

export interface SentenceLengthItem {
  words: number;
  count: number;
}

export interface WordLengthItem {
  length: number;
  count: number;
}
export interface JsonData {
  chartData: Array<{ category: string; value: number }>;
  wordCloudData: Array<{ text: string; value: number }>;
  wordLengthData: Array<{ length: number; count: number }>;
  sentenceLengthData: Array<{ words: number; count: number }>;
  compositionData: Array<{ type: string; count: number }>;
  delayData: Array<{ range: string; count: number }>;
  speedData: Array<{ time: string; tokensPerSec: number }>;
  throughputData: Array<{ time: string; throughput: number }>;
  slowdownData: Array<{ index: number; delay: number; avgDelay: number }>;
}

export interface VisualizationProps {
  data: JsonData;
}

export interface ChartVisualizationProps {
  chartData: ChartDataItem[];
}

export interface SentenceLengthVisualizationProps {
  chartData: SentenceLengthItem[];
}

export interface WordCloudVisualizationProps {
  wordCloudData: WordCloudDataItem[];
}

export interface WordLengthVisualizationProps {
  chartData: WordLengthItem[];
}