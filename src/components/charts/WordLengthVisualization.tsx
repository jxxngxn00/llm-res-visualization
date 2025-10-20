import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WordLengthVisualizationProps } from '../../types';

const WordLengthVisualization: React.FC<WordLengthVisualizationProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data available.</p>;
  }

  return (
      <div style={{ width: '100%', height: 250 }}>
        <h3 style={{ textAlign : 'center'}}> 단어 길이 분포 (Bar)</h3>
        <ResponsiveContainer>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            role="img"
            aria-label="Bar chart showing category values"
          >
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#82ca9d"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    
  );
};

export default WordLengthVisualization;
