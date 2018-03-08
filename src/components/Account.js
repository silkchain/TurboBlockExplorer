import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as selectors from '@/reducers/selectors';

import DetailList from './DetailList';
import DetailListItem from './DetailListItem';

const mapStateToProps = (state) => ({
  account: selectors.getCurrentAccountForDisplay(state),
});

const Account = ({ account = {} }) => (
  <div className='turbo-content-wrapper'>
    <h2 className='content-block__title'>Account Details</h2>
    <DetailList>
      <DetailListItem name='Address' value={account.address} />
      <DetailListItem name='Tx Count' value={account.transactionCount} />
      <DetailListItem
        name='Balance (ETH)'
        value={account.balanceInEther}
      />
      <DetailListItem name='Balance (Wei)' value={`${account.balanceInWei} Wei`} />
    </DetailList>
  </div>
);

Account.propTypes = {
  account: PropTypes.object,
};

export default connect(mapStateToProps)(Account);
