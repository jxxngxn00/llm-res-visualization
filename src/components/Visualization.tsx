import React from 'react';
import ChartVisualization from './charts/ChartVisualization';
import PieChartVisualization from './charts/PieChartVisualization';
import LineChartVisualization from './charts/LineChartVisualization';
import WordLengthVisualization from './charts/WordLengthVisualization';
import WordCloudVisualization from './charts/WordCloudVisualization';
import { VisualizationProps } from '../types';
import SentenceLengthVisualization from './charts/SentenceLengthVisualization';

const Visualization: React.FC<VisualizationProps> = ({ data }) => {
  return (
    <div>
      <section style={{ marginBottom: '5rem' }}>
        <h2>Model Chart Visualization</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr 1fr', width: '100%'}}>
          <ChartVisualization chartData={data.chartData} />
          <PieChartVisualization chartData={data.chartData} />
          <LineChartVisualization chartData={data.chartData} />
        </div>
      </section>
      <section style={{ marginBottom: '5rem' }}>
        <h2>Word Chart Visualization</h2>
        <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: '1fr 1fr', width: '100%'}}>
          <WordLengthVisualization chartData={data.wordLengthData} />
          <SentenceLengthVisualization chartData={data.sentenceLengthData} />
        </div>
      </section>
      <section>
        <h2>Word Cloud Visualization</h2>
        <WordCloudVisualization wordCloudData={data.wordCloudData} />
      </section>
    </div>
  );
};

export default Visualization;
