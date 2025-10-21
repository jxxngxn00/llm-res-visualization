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
    fontSizes: [20, 60] as [number, number],
    fontFamily: 'impact',
    padding: 5,
    width: 500,
    height: 400,
  }), []);

  if (!wordCloudData || wordCloudData.length === 0) {
    return <p>No word cloud data available.</p>;
  }

  useEffect(() => {
    // 기존 내용 제거
    d3.select('#word-cloud').selectAll('*').remove();
    
    const layout = cloud()
      .size([options.width, options.height])
      .words(wordCloudData.map(d => ({ 
        text: d.text, 
        size: Math.min(Math.max(d.value * 10, options.fontSizes[0]), options.fontSizes[1])
      })))
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
        .style("font-size", d => `${d.size}px`)
        .style("font-family", options.fontFamily)
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
