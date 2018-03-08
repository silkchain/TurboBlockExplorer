import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getStatisticsForDisplay,
  getLatestBlocksForDisplay,
} from '@/reducers/selectors';
import { tableFields } from '@/constants';

import Statistics from './Statistics';
import Table from './Table';

const mapStateToProps = (state) => ({
  blocks: getLatestBlocksForDisplay(state),
  statistics: getStatisticsForDisplay(state),
});

const Start = ({ blocks = [], statistics = {} }) => (
  <div className='turbo-content-wrapper dashboard'>
    <div className='dashboard__element'>
      <h2 className='content-block__title'>Stats</h2>
      <Statistics statistics={statistics} />
    </div>
    <div className='dashboard__element'>
      <h2 className='content-block__title'>Latest Blocks</h2>
      <Table dataArray={blocks} fields={tableFields.blocks} />
      </div>
  </div>
);

Start.propTypes = {
  blocks: PropTypes.array,
  statistics: PropTypes.object,
};

export default connect(mapStateToProps)(Start);
