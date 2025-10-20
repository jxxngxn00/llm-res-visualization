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
  chartData: ChartDataItem[];
  wordCloudData: WordCloudDataItem[];
  wordLengthData: Array<{ length: number; count: number }>;
  sentenceLengthData: Array<{ words: number; count: number }>;
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