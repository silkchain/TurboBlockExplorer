import React from 'react';
import PropTypes from 'prop-types';

import TextStatsItem from './TextStatsItem';
import BarChart from './BarChart';
import BigNumber from './BigNumber';

const Statistics = ({ statistics = {} }) => (
  <div className='content-block'>
    <div key='stats-body' className='content-block'>
      <div className='text-stats'>
        <TextStatsItem name='Peer Count' value={statistics.peerCount} />
        <TextStatsItem name='Gas Price' value={`${statistics.gasPriceInGwei} Gwei`} />
        <TextStatsItem name='Latest Block Number' value={statistics.latestBlockNumber} />
        <TextStatsItem
          name='Average Block Time*'
          value={<BigNumber unit='s'>{statistics.averageBlockTime}</BigNumber>}
        />
        <TextStatsItem
          name='Average Difficulty*'
          value={<BigNumber unit='H'>{statistics.averageDifficulty}</BigNumber>}
        />
        <TextStatsItem
          name='Hash Rate*'
          value={<BigNumber unit='H/s'>{statistics.hashRate}</BigNumber>}
        />
      </div>
      <p className='content__fineprint'>* Based on the latest {statistics.consideredBlocks} Blocks</p>
      <div className='chart-stats'>
        <BarChart values={statistics.difficulties} title='Difficulties' unit='H' />
        <BarChart values={statistics.blockTimes} title='Block Times' unit='s' />
      </div>
    </div>
  </div>
);

Statistics.propTypes = {
  statistics: PropTypes.object,
};

export default Statistics;
