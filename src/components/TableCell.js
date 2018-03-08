import React from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';

const TableCell = ({
  entry = {},
  field = {},
}) => (
  <td className='turbo-table__cell' data-label={field.label}>
    {entry.linkType
      ? <Link
          to={{ type: entry.linkType, payload: entry.linkPayload }}
          className='turbo-table__link'
        >{entry.value}</Link>
      : entry.value
    }
  </td>
);

TableCell.propTypes = {
  entry: PropTypes.object,
  field: PropTypes.object,
};

export default TableCell;
