// components/ThroughputChart.tsx
import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface ThroughputDataItem {
    time: string
    throughput: number
}

// Define the props interface
interface ThroughputChartProps {
  chartData: ThroughputDataItem[]
}

const ThroughputChart: React.FC<ThroughputChartProps> = ({ chartData }) => {
  if (!chartData?.length) return <p>No throughput data</p>

  return (
    <div>
      <h3>처리량(Throughput) 측정</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="throughput" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ThroughputChart
