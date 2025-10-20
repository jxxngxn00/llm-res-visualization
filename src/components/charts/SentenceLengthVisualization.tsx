import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SentenceLengthVisualizationProps } from '../../types';

const SentenceLengthVisualization: React.FC<SentenceLengthVisualizationProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data available.</p>;
  }

  return (
      <div style={{ width: '100%', height: 250 }}>
        <h3 style={{ textAlign : 'center'}}> 문장 길이 분포 (Line)</h3>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            role="img"
          >
            <XAxis dataKey="words" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff7300"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    
  );
};

export default SentenceLengthVisualization;
