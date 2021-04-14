import React, { useContext } from 'react';
import {
  BottomNavigation, BottomNavigationAction, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { InspectionItemContext } from '../context/InspectionItemContext';
import { InspectionItem } from '../Types';
import { InspectionItemRow } from './InspectionItemRow';

interface InspectionItemFormProps {
  equipmentId: string,
  inspectionItems: InspectionItem[],
  setEquipmentId: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>,
};

export const InspectionItemForm = (props: InspectionItemFormProps): JSX.Element => {
  const itemContext = useContext(InspectionItemContext);

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (inspectionItem: InspectionItem) => {
    props.setEquipmentId(props.equipmentId);
    props.setAdditional(false);
    itemContext.setItem(inspectionItem);
    props.setOpen(true);
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = () => {
    props.setEquipmentId(props.equipmentId);
    props.setAdditional(true);
    itemContext.setItem({
      inspection_item_id: Math.random().toString(36).substr(2, 9),
      inspection_content: '',
      input_type: 1,
      choices: [],
    })
    props.setOpen(true);
  };

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
            {props.inspectionItems.map((item: InspectionItem) =>
              <InspectionItemRow
                key={item.inspection_item_id}
                equipmentId={props.equipmentId}
                item={item}
                handleEditItem={handleEditItem}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label='点検項目追加'
          icon={<AddCircleIcon />}
          onClick={() => handleAddItem()}
        />
      </BottomNavigation>
    </>
  );
}
