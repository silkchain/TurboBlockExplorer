export const fallbackUrl = 'http://rpc.turboblockware.org:8645';
export const maxBlocksPerPage = 10;

export const tableFields = {
  blocks: [
    {
      key: 'number',
      label: 'Block',
    },
    {
      key: 'time',
      label: 'Time',
    },
    {
      key: 'transactions',
      label: '# of Tx',
    },
    {
      key: 'miner',
      label: 'Mined by',
    },
  ],
  transactions: [
    {
      key: 'hash',
      label: 'Tx Hash',
    },
    {
      key: 'amount',
      label: 'Amount',
    },
  ],
};
