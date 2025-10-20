import React, { useMemo } from 'react';
import ReactWordcloud from 'react-wordcloud';
import { WordCloudVisualizationProps } from '../../types';

const WordCloudVisualization: React.FC<WordCloudVisualizationProps> = ({
  wordCloudData,
}) => {
  const options = useMemo(() => ({
    rotations: 2,
    rotationAngles: [-90, 0] as [number, number],
    fontSizes: [20, 60] as [number, number],
    fontFamily: 'impact',
    padding: 1,
  }), []);

  if (!wordCloudData || wordCloudData.length === 0) {
    return <p>No word cloud data available.</p>;
  }

  return (
    <div style={{ height: 300, width: '100%' }} aria-label="Word cloud visualization">
      <ReactWordcloud words={wordCloudData} options={options} />
    </div>
  );
};

export default WordCloudVisualization;
