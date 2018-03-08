import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getLatestBlocksForDisplay } from '@/reducers/selectors';
import { tableFields } from '@/constants';

import Table from './Table';

const mapStateToProps = (state) => ({
  blocks: getLatestBlocksForDisplay(state),
});

const Blocks = ({ blocks = [], title = 'Latest Blocks' }) => (
  <div className='turbo-content-wrapper'>
    <h2 className='content-block__title'>{title}</h2>
    <Table dataArray={blocks} fields={tableFields.blocks} />
  </div>
);

Blocks.propTypes = {
  blocks: PropTypes.array,
  title: PropTypes.string,
};

export default connect(mapStateToProps)(Blocks);
