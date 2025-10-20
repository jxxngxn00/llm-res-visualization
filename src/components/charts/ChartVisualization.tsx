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
import { ChartVisualizationProps } from '../../types';

const ChartVisualization: React.FC<ChartVisualizationProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data available.</p>;
  }

  return (
      <div style={{ width: '100%', height: 250 }}>
        <h3 style={{ textAlign : 'center'}}> 모델별 처리량 (Bar)</h3>
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
            <Bar dataKey="value" fill="#8884d8" name="Value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
  );
};

export default ChartVisualization;
