import React from 'react';
import PropTypes from 'prop-types';

const TurboVortex = ({
  content,
  size,
  svgClass,
}) => (
  <svg height={size} width={size} className={svgClass} viewBox='0 0 126 120'>
    <polygon
      points='41,0 85,0 104,11 126,49 126,71 104,109 85,120 41,120 22,109 0,71 0,49 22,11'
    ></polygon>
    <polygon
      points='63,0 85,0 115,30 126,49 115,90 104,109 63,120 41,120 11,90 0,71 11,30 22,11'
    ></polygon>
    {content}
</svg>
);

TurboVortex.propTypes = {
  content: PropTypes.element,
  size: PropTypes.string,
  svgClass: PropTypes.string,
};

export default TurboVortex;
