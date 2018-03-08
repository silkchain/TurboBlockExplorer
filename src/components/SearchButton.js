import React from 'react';

import TurboVortex from '@/svgs/TurboVortex';
import Search from '@/svgs/Search';

const SearchButton = () => (
  <button className='search-button'>
    <TurboVortex
      size='60px'
      svgClass='search-button__svg'
      content={<Search size='60%' position='20%' svgClass='search-button__icon' />} />
  </button>
);

export default SearchButton;
