import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';

import * as selectors from '@/reducers/selectors';
import { BLOCK_DETAIL } from '@/router';
import { tableFields } from '@/constants';

import Table from './Table';

const mapStateToProps = (state) => {
  const blockNumber = state.location.payload.blockNumber;
  const transactionHashes = selectors.getTransactionHashesForBlock(state, blockNumber);
  const blockLink = (<Link to={{ type: BLOCK_DETAIL, payload: { blockNumber }}}>{blockNumber}</Link>);
  return {
    transactions: selectors.getTransactionsForDisplay(state, transactionHashes),
    title: <span>Transactions for Block # {blockLink}</span>,
  };
};

const Transactions = ({ transactions = [], title = 'Transactions' }) => (
  <div className='turbo-content-wrapper'>
    <h2 className='content-block__title'>{title}</h2>
    <Table dataArray={transactions} fields={tableFields.transactions} />
  </div>
);

Transactions.propTypes = {
  transactions: PropTypes.array,
  title: PropTypes.element,
};

export default connect(mapStateToProps)(Transactions);
