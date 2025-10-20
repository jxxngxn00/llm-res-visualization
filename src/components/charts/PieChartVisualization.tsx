import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ChartVisualizationProps } from '../../types';

const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

const PieChartVisualization: React.FC<ChartVisualizationProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data available.</p>;
  }
  return (
    <div style={{ width: '100%', height: 250 }}>
      <h3 style={{ textAlign: 'center' }}>모델 비율 (Pie)</h3>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="category"
            outerRadius={80}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default PieChartVisualization;
