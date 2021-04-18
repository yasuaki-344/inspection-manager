import React, { FC } from 'react';
import {
  BottomNavigation, BottomNavigationAction, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { InspectionItem } from '../Types';
import { InspectionItemRow } from './InspectionItemRow';

interface InspectionItemFormProps {
  equipmentId: string,
  inspectionItems: InspectionItem[],
  editInspectionItem: (equipmentId: string, inspectionItem: InspectionItem) => void,
  addInspectionItem: (equipmentId: string) => void
};

export const InspectionItemForm: FC<InspectionItemFormProps> = ({
  equipmentId,
  inspectionItems,
  editInspectionItem,
  addInspectionItem
}): JSX.Element => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>点検項目</TableCell>
              <TableCell>点検タイプ</TableCell>
              <TableCell>選択肢</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {inspectionItems.map((item: InspectionItem) =>
              <InspectionItemRow
                key={item.inspection_item_id}
                equipmentId={equipmentId}
                inspectionItem={item}
                editInspectionItem={editInspectionItem}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          data-testid='add-item-button'
          label='点検項目追加'
          icon={<AddCircleIcon />}
          onClick={() => addInspectionItem(equipmentId)}
        />
      </BottomNavigation>
    </>
  );
}
