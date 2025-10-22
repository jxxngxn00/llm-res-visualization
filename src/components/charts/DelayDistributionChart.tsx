// components/DelayDistributionChart.tsx
// 딜레이 분포 확인 차트
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface DelayDataItem {
    range : string
    count : number
}

// Define the props interface
interface DelayDataChartProps {
  chartData: DelayDataItem[]
}



const DelayDistributionChart: React.FC<DelayDataChartProps> = ({ chartData }) => {
  if (!chartData?.length) return <p>No delay data</p>

  return (
    <div>
      <h3>토큰 생성 딜레이 분포</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DelayDistributionChart
