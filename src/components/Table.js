import React from 'react';
import PropTypes from 'prop-types';

import TableCell from './TableCell';

const Table = ({
  dataArray = [],
  fields = [],
}) => (
  <table className='content-block turbo-table'>
    <thead className='turbo-table__header'>
      <tr>
        {fields.map(field => (
          <th key={field.key}>{field.label}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {dataArray.map(dataSet => (
        <tr className='turbo-table__row' key={dataSet.key.value}>
          {fields.map(field => (
            <TableCell key={field.key} field={field} entry={dataSet[field.key]} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

Table.propTypes = {
  dataArray: PropTypes.array,
  fields: PropTypes.array,
};

export default Table;
