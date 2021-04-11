import React, { useContext } from 'react';
import {
  BottomNavigation, BottomNavigationAction, IconButton, Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { InspectionItemContext } from '../context/InspectionItemContext';

interface ItemRowProps {
  equipmentId: string,
  item: InspectionItem,
  handleEditItem: (item: InspectionItem) => void,
};

const ItemRow = (props: ItemRowProps): JSX.Element => {
  const context = useContext(InspectionSheetContext);

  return (
    <TableRow key={props.item.inspection_item_id}>
      <TableCell>
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
      <TableCell align='right'>
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

interface InspectionItemFormProps {
  equipmentId: string,
  inspectionItems: InspectionItem[],
  setEquipmentId: React.Dispatch<React.SetStateAction<string>>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setAdditional: React.Dispatch<React.SetStateAction<boolean>>,
};

export const InspectionItemForm = (props: InspectionItemFormProps): JSX.Element => {
  const context = useContext(InspectionSheetContext);
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
              <TableCell>点検項目</TableCell>
              <TableCell>点検タイプ</TableCell>
              <TableCell>選択肢</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.inspectionItems.map((item: InspectionItem) =>
              <TableRow key={item.inspection_item_id}>
                <TableCell>
                  <IconButton
                    size='small'
                    onClick={() => handleEditItem(item)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell component='th' scope='row'>
                  {item.inspection_content}
                </TableCell>
                <TableCell>
                  {useInputTypes.filter(e => e.value === item.input_type)[0].label}
                </TableCell>
                <TableCell>
                  {item.choices.join(',')}
                </TableCell>
                <TableCell align='right'>
                  <IconButton color='primary' size='small'
                    onClick={() => context.removeInspectionItem(
                      props.equipmentId, item.inspection_item_id
                    )}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
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
