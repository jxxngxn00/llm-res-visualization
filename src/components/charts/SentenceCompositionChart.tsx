// components/SentenceCompositionChart.tsx
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface CompositionDataItem {
    type : string
    count : number
}

// Define the props interface
interface SentenceCompositionChartProps {
  chartData: CompositionDataItem[]
}

const SentenceCompositionChart: React.FC<SentenceCompositionChartProps> = ({ chartData }) => {
  if (!chartData?.length) return <p>No composition data</p>

  return (
    <div>
      <h3>문장 구성 비율</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="type"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, i) => (
              <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SentenceCompositionChart
