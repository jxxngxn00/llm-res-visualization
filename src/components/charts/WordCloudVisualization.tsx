import React, { useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { WordCloudVisualizationProps } from '../../types';

const WordCloudVisualization: React.FC<WordCloudVisualizationProps> = ({
  wordCloudData,
}) => {
  const options = useMemo(() => ({
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [16, 48] as [number, number], // 크기 범위 조정
    fontFamily: 'Arial, sans-serif', // 웹 안전 폰트 사용
    padding: 3, // 패딩 줄임
    width: 600, // 크기 증가
    height: 400,
  }), []);

  if (!wordCloudData || wordCloudData.length === 0) {
    return <p>No word cloud data available.</p>;
  }

  useEffect(() => {
    // 기존 내용 제거
    d3.select('#word-cloud').selectAll('*').remove();
    
    // 단어 빈도 정규화
    const maxValue = Math.max(...wordCloudData.map(d => d.value));
    const minValue = Math.min(...wordCloudData.map(d => d.value));
    
    console.log('Word frequencies:', wordCloudData); // 디버깅용
    console.log('Max value:', maxValue, 'Min value:', minValue); // 디버깅용
    
    const layout = cloud()
      .size([options.width, options.height])
      .words(wordCloudData.map(d => {
        // 정규화된 폰트 크기 계산
        const normalizedValue = maxValue > minValue 
          ? (d.value - minValue) / (maxValue - minValue) 
          : 0.5;
        
        const fontSize = options.fontSizes[0] + 
          (normalizedValue * (options.fontSizes[1] - options.fontSizes[0]));
        
        console.log(`Word: ${d.text}, frequency: ${d.value}, fontSize: ${fontSize}`); // 디버깅용
        
        return {
          text: d.text,
          size: Math.max(fontSize, options.fontSizes[0]) // 최소 크기 보장
        };
      }))
      .padding(options.padding)
      .rotate(() => {
        const angles = options.rotationAngles;
        return angles[Math.floor(Math.random() * angles.length)];
      })
      .font(options.fontFamily)
      .fontSize(d => d.size || options.fontSizes[0])
      .on('end', draw);

    layout.start();

    function draw(words: any[]) {
      console.log('Drawing words:', words); // 디버깅용
      
      d3.select("#word-cloud")
        .append("svg")
        .attr("width", options.width)
        .attr("height", options.height)
        .style("border", "1px solid #ddd")
        .style("border-radius", "8px")
        .append("g")
        .attr("transform", `translate(${options.width / 2}, ${options.height / 2})`)
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => {
          console.log(`Rendering ${d.text} with size ${d.size}px`); // 디버깅용
          return `${d.size}px`;
        })
        .style("font-family", options.fontFamily)
        .style("font-weight", "bold") // 폰트 굵기 추가
        .style("fill", (d, i) => d3.schemeCategory10[i % 10])
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x}, ${d.y}) rotate(${d.rotate})`)
        .text(d => d.text)
        .style("cursor", "pointer")
        .on("mouseover", function() {
          d3.select(this).style("opacity", 0.7);
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
        });
    }
  }, [wordCloudData, options]);

  return (
    <div style={{ height: 450, width: '100%' }} aria-label="Word cloud visualization">
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>단어 빈도수 분석</h3>
      <div id="word-cloud" style={{ display: 'flex', justifyContent: 'center' }}></div>
    </div>
  );
};

export default WordCloudVisualization;
