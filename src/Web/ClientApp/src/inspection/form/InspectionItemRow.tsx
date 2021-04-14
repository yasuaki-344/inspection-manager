import React, { useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { useInputTypes, InspectionItem, ItemType } from '../Types';

interface InspectionItemRowProps {
  equipmentId: string,
  item: InspectionItem,
  handleEditItem: (item: InspectionItem) => void,
};

export const InspectionItemRow = (props: InspectionItemRowProps): JSX.Element => {
  const context = useContext(InspectionSheetContext);
  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.INSPECTION_ITEM,
    drop(item: any) {
      if (!dropRef.current || item.equipmentId !== props.equipmentId ||
        item.itemId === props.item.inspection_item_id) {
        return;
      }
      context.swapInspectionItem(props.equipmentId, props.item.inspection_item_id, item.itemId);
    },
  })

  const [, drag, preview] = useDrag({
    type: ItemType.INSPECTION_ITEM,
    item: {
      equipmentId: props.equipmentId,
      itemId: props.item.inspection_item_id
    },
  })

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <TableRow key={props.item.inspection_item_id} ref={dropRef}>
      <TableCell padding='checkbox' ref={dragRef}>
        <IconButton
          size='small'
        >
          <DragHandleIcon />
        </IconButton>
      </TableCell>
      <TableCell padding='checkbox'>
        <IconButton
          size='small'
          onClick={() => props.handleEditItem(props.item)}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell component='th' scope='row'>
        {props.item.inspection_content}
      </TableCell>
      <TableCell>
        {useInputTypes.filter(e => e.value === props.item.input_type)[0].label}
      </TableCell>
      <TableCell>
        {props.item.choices.join(',')}
      </TableCell>
      <TableCell padding='checkbox'>
        <IconButton color='primary' size='small'
          onClick={() => context.removeInspectionItem(
            props.equipmentId, props.item.inspection_item_id
          )}
        >
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
