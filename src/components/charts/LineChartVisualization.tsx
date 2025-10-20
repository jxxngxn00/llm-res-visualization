import React from 'react';
import {
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartVisualizationProps } from '../../types';

const LineChartVisualization: React.FC<ChartVisualizationProps> = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <p>No chart data available.</p>;
  }

  const lineData = chartData.map((d, i) => ({
    index : i+1,
    cumulative : chartData.slice(0, i + 1).reduce((acc, curr) => acc + curr.value, 0),
  }));

  return (
    <div style={{ width: '100%', height: 250 }}>
      <h3 style={{ textAlign: 'center' }}>누적 응답 길이 변화 (Line)</h3>
      <ResponsiveContainer>
        <LineChart
          data={lineData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          role="img"
          aria-label="Line chart showing cumulative values"
        >
          <XAxis dataKey="index" label={{ value: 'Chunk', position: 'insideBottomRight' }} />
          <YAxis label={{ value: 'Cumulative', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cumulative" stroke="#82ca9d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartVisualization;
