import React, { FC, useContext, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { IconButton, TableCell, TableRow } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import EditIcon from '@mui/icons-material/Edit';
import { InspectionSheetContext } from '../../../App';
import { useInputTypes, ItemType } from '../../../entities';
import { InspectionItem } from '../../../entities';
import { CancelIconButton } from '../../common';

interface DragItem {
  equipmentIndex: number,
  inspectionItemIndex: number,
};

interface InspectionItemRowProps {
  equipmentIndex: number,
  inspectionItemIndex: number,
  inspectionItem: InspectionItem,
  editInspectionItem: (equipmentIndex: number, inspectionItemIndex: number, item: InspectionItem) => void,
  storeHistory: () => void,
};

export const InspectionItemRow: FC<InspectionItemRowProps> = ({
  equipmentIndex,
  inspectionItemIndex,
  inspectionItem,
  editInspectionItem,
  storeHistory
}): JSX.Element => {
  const { sheetController } = useContext(InspectionSheetContext);
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
      sheetController.swapInspectionItem(equipmentIndex, inspectionItemIndex, item.inspectionItemIndex);
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
          onClick={() => editInspectionItem(equipmentIndex, inspectionItemIndex, inspectionItem)}>
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
        {inspectionItem.choices.map(x => x.description).join(',')}
      </TableCell>
      <TableCell padding='checkbox'>
        <CancelIconButton
          onClick={() => sheetController.removeInspectionItem(equipmentIndex, inspectionItemIndex)}
        />
      </TableCell>
    </TableRow>
  );
};
