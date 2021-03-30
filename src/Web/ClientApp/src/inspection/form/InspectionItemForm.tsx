import React, { Fragment } from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { useInputTypes } from '../Types';

export const InspectionItemForm = (props: any): JSX.Element => {
  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size='small' onClick={() => props.editInspectionItem()}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {props.inspectionItem.inspection_content}
        </TableCell>
        <TableCell>
          {useInputTypes.filter(e => e.value === props.inspectionItem.input_type)[0].label}
        </TableCell>
        <TableCell>
          {props.inspectionItem.choices.join(',')}
        </TableCell>
        <TableCell align='right'>
          <IconButton color='primary' size='small'
            onClick={() => props.removeInspectionItem(
              props.equipment_id, props.inspectionItem.inspection_item_id
            )}
          >
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}