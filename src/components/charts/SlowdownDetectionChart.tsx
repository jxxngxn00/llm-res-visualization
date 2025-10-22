// components/SlowdownDetectionChart.tsx
import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts'

interface SlowDownDataItem {
    time: string
    delay: number
    avgDelay: number
    index: number
}

// Define the props interface
interface SlowDownChartProps {
  chartData: SlowDownDataItem[]
}
const SlowdownDetectionChart: React.FC<SlowDownChartProps> = ({ chartData }) => {
  if (!chartData?.length) return <p>No slowdown data</p>

  const slowZones = chartData.filter(d => d.delay > d.avgDelay * 1.5)

  return (
    <div>
      <h3>느려지는 구간 탐지</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="index" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="delay" stroke="#ff0000" dot={false} />
          {slowZones.map((z, i) => (
            <ReferenceArea
              key={i}
              x1={z.index - 0.5}
              x2={z.index + 0.5}
              strokeOpacity={0.3}
              fill="orange"
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SlowdownDetectionChart
