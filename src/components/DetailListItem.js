import React from 'react';
import PropTypes from 'prop-types';

const DetailListItem = ({ name = '', value = '' }) => (
  <div className='list__item'>
    <dt className='list__key'>{name}</dt>
    <dd className='list__value'>{value}</dd>
  </div>
);

DetailListItem.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

export default DetailListItem;
