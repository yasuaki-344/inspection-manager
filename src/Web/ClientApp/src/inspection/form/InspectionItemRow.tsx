import React, { FC, useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { useInputTypes, InspectionItem, InspectionSheetContextType, ItemType } from '../Types';

interface DragItem {
  equipmentIndex: number,
  inspectionItemIndex: number,
};

interface InspectionItemRowProps {
  equipmentIndex: number,
  inspectionItemIndex: number,
  inspectionItem: InspectionItem,
  editInspectionItem: (equipmentIndex: number, item: InspectionItem) => void,
  storeHistory: () => void,
};

export const InspectionItemRow: FC<InspectionItemRowProps> = ({
  equipmentIndex,
  inspectionItemIndex,
  inspectionItem,
  editInspectionItem,
  storeHistory
}): JSX.Element => {
  const context = useContext<InspectionSheetContextType>(InspectionSheetContext);
  const dropRef = useRef<HTMLTableRowElement>(null);
  const dragRef = useRef<HTMLTableCellElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.INSPECTION_ITEM,
    drop(item: DragItem) {
      if (!dropRef.current ||
        item.equipmentIndex !== equipmentIndex ||
        item.inspectionItemIndex === inspectionItemIndex) {
        return;
      }
      context.swapInspectionItem(equipmentIndex, inspectionItemIndex, item.inspectionItemIndex);
    },
  })

  const [, drag, preview] = useDrag({
    type: ItemType.INSPECTION_ITEM,
    item: {
      equipmentIndex: equipmentIndex,
      inspectionItemIndex: inspectionItemIndex
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
        <IconButton
          data-testid='edit-item-button'
          size='small'
          onClick={() => editInspectionItem(equipmentIndex, inspectionItem)}>
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
        <IconButton
          data-testid='remove-item-button'
          color='primary'
          size='small'
          onClick={() => context.removeInspectionItem(equipmentIndex, inspectionItemIndex)}
        >
          <CancelIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
