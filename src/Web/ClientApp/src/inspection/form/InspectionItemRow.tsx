import React, { FC, useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { useInputTypes, InspectionItem, InspectionSheetContextType, ItemType  } from '../Types';

interface DragItem {
  equipmentId: string;
  itemId: string;
};

interface InspectionItemRowProps {
  equipmentId: string,
  inspectionItem: InspectionItem,
  editInspectionItem: (item: InspectionItem) => void,
};

export const InspectionItemRow: FC<InspectionItemRowProps> = ({ equipmentId, inspectionItem, editInspectionItem }): JSX.Element => {
  const context = useContext<InspectionSheetContextType>(InspectionSheetContext);
  const dropRef = useRef<HTMLTableRowElement>(null);
  const dragRef = useRef<HTMLTableCellElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.INSPECTION_ITEM,
    drop(item: DragItem) {
      if (!dropRef.current ||
        item.equipmentId !== equipmentId ||
        item.itemId === inspectionItem.inspection_item_id) {
        return;
      }
      context.swapInspectionItem(equipmentId, inspectionItem.inspection_item_id, item.itemId);
    },
  })

  const [, drag, preview] = useDrag({
    type: ItemType.INSPECTION_ITEM,
    item: {
      equipmentId: equipmentId,
      itemId: inspectionItem.inspection_item_id
    },
  })

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <TableRow key={inspectionItem.inspection_item_id} ref={dropRef}>
      <TableCell padding='checkbox' ref={dragRef}>
        <IconButton size='small'>
          <DragHandleIcon />
        </IconButton>
      </TableCell>
      <TableCell padding='checkbox'>
        <IconButton size='small' onClick={() => editInspectionItem(inspectionItem)}>
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell component='th' scope='row'>
        {inspectionItem.inspection_content}
      </TableCell>
      <TableCell>
        {useInputTypes.filter(e => e.value === inspectionItem.input_type)[0].label}
      </TableCell>
      <TableCell>
        {inspectionItem.choices.join(',')}
      </TableCell>
      <TableCell padding='checkbox'>
        <IconButton color='primary' size='small'
          onClick={() => context.removeInspectionItem(equipmentId, inspectionItem.inspection_item_id)}
        >
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};