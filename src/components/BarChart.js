import React from 'react';
import PropTypes from 'prop-types';

import BigNumber from './BigNumber';

const BarChart = ({ values = [], title = '', unit = '' }) => {
  const barWidth = 100 / values.length;
  const maxValue = Math.max.apply(null, values);
  const minValue = Math.min.apply(null, values);
  const difference = maxValue - minValue;

  const heights = values.map(value => (value - minValue) / difference * 100);

  return (
    <div className='bar-chart__wrapper'>
      <h4 key='title' className='bar-chart__title'>{title}</h4>
      <p key='maxValue' className='bar-chart__legend'>max: <BigNumber unit={unit}>{maxValue}</BigNumber></p>
      <div className='bar-chart' key='chart'>
        {heights.map((height, index) => {
          return (
            <div
              key={index}
              className='bar-chart__item'
              style={{
                flexBasis: `${barWidth}%`,
                height: `${height}%`,
              }}
            />
          );
        })}
      </div>
      <p key='minValue' className='bar-chart__legend'>min: <BigNumber unit={unit}>{minValue}</BigNumber></p>
    </div>
  );
};

BarChart.propTypes = {
  title: PropTypes.string,
  unit: PropTypes.string,
  values: PropTypes.array,
};

export default BarChart;
