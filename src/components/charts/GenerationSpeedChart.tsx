// components/GenerationSpeedChart.tsx
// 생성 속도 누적 확인

interface SpeedDataItem {
    time: string
    tokensPerSec: number
}

// Define the props interface
interface GenerationSpeedChartProps {
  chartData: SpeedDataItem[]
}

import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const GenerationSpeedChart: React.FC<GenerationSpeedChartProps> = ({ chartData }) => {
  if (!chartData?.length) return <p>No speed data</p>

  return (
    <div>
      <h3>토큰 생성 속도 (누적)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tokensPerSec" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default GenerationSpeedChart
