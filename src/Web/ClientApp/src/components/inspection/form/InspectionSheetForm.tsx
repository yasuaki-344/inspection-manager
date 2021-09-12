import React, { FC, useContext, useEffect, useState } from 'react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  BottomNavigation, BottomNavigationAction,
  MenuItem, Grid, Paper, TextField
} from '@material-ui/core';
import UndoIcon from '@material-ui/icons/Undo';
import { EquipmentForm } from './EquipmentForm';
import { InspectionItemDialog } from '../dialog/InspectionItemDialog';
import { InspectionSheetContext, InspectionItemContext } from '../../../App';
import { Equipment, InspectionItem, InspectionSheet } from '../../../entities';
import { InspectionGroup, InspectionType } from '../../../typescript-fetch';
import { BottomNavigationAdd } from '../../common';
import { InspectionGroupRepository, InspectionTypeRepository } from '../../../infrastructure';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sheetLabel: {
      backgroundColor: theme.palette.primary.main,
      color: "#FFFFFF",
      fontSize: 24,
      padding: 4,
    },
    sheetElement: {
      margin: 4,
      width: 250,
    },
    sheetIdElement: {
      margin: 4,
      width: 330,
    },
  })
);

interface InspectionSheetFormProps {
  isEdit: boolean,
};

export const InspectionSheetForm: FC<InspectionSheetFormProps> = ({ isEdit }): JSX.Element => {
  const classes = useStyles();
  const { sheetPresenter, sheetController } = useContext(InspectionSheetContext);
  const { itemPresenter, itemController } = useContext(InspectionItemContext);
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [open, setOpen] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [additional, setAdditional] = useState(false);
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [inspectionItemIndex, setInspectionItemIndex] = useState(0);
  const [history, setHistory] = useState<InspectionSheet[]>([]);

  useEffect(() => {
    const groupApi = new InspectionGroupRepository();
    groupApi.get()
      .then(res => setGroups(res))
      .catch(console.error);
    const typeApi = new InspectionTypeRepository();
    typeApi.get()
      .then(res => setTypes(res))
      .catch(console.error);
  }, []);

  const storeHistory = () => {
    setHistory(history.concat(sheetPresenter));
    setUndoDisabled(false);
  }

  const getHistory = () => {
    const sheet = history.pop();
    if (sheet != null) {
      sheetController.setSheet(sheet);
      setUndoDisabled(!history.length);
    }
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      sheetController.addInspectionItem(equipmentIndex, itemPresenter.getState());
    } else {
      sheetController.updateInspectionItem(equipmentIndex, inspectionItemIndex, itemPresenter.getState());
    }
    storeHistory();
    setOpen(false);
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: number) => {
    setEquipmentIndex(equipmentId);
    setAdditional(true);
    itemController.setItem({
      inspection_item_id: 0,
      inspection_content: '',
      input_type: 1,
      choices: [],
    })
    setOpen(true);
  }

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (equipmentIndex: number, inspectionItemIndex: number, inspectionItem: InspectionItem) => {
    setEquipmentIndex(equipmentIndex);
    setInspectionItemIndex(inspectionItemIndex);
    setAdditional(false);
    itemController.setItem(inspectionItem);
    setOpen(true);
  }

  const contents = isEdit
    ? <Grid item xs={12}>
      <TextField
        className={classes.sheetIdElement}
        disabled
        id="outlined-required"
        label="点検シートID"
        variant="outlined"
        size="small"
        name="sheet_id"
        defaultValue={sheetPresenter.sheet_id}
        InputProps={{ readOnly: true, }}
      />
    </Grid>
    : <></>;

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper variant="outlined">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.sheetLabel}>点検シート情報</div>
          </Grid>
          {contents}
          <Grid item xs={12}>
            <TextField
              className={classes.sheetElement}
              required
              autoFocus
              id="outlined-required"
              label="点検シート名"
              variant="outlined"
              size="small"
              name="sheet_name"
              value={sheetPresenter.sheet_name}
              onChange={e => sheetController.updateField(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.sheetElement}
              select
              id='outlined-required'
              label='点検グループ'
              variant='outlined'
              size='small'
              name='inspection_group_id'
              value={sheetPresenter.inspection_group_id}
              onChange={e => sheetController.updateField(e)}
            >
              {groups.map((option: InspectionGroup) => (
                <MenuItem key={option.inspection_group_id} value={option.inspection_group_id}>
                  {option.description}
                </MenuItem >
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.sheetElement}
              select
              id='outlined-required'
              label='点検タイプ'
              variant='outlined'
              size='small'
              name='inspection_type_id'
              value={sheetPresenter.inspection_type_id}
              onChange={e => sheetController.updateField(e)}
            >
              {types.map((option: InspectionType) => (
                <MenuItem key={option.inspection_type_id} value={option.inspection_type_id}>
                  {option.description}
                </MenuItem >
              ))}
            </TextField>
          </Grid>
          {sheetPresenter.equipments.map((equipment: Equipment, index: number) =>
            <Grid item xs={12} key={`equipment-${index}`}>
              <EquipmentForm
                index={index}
                equipment={equipment}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
                storeHistory={storeHistory}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                disabled={undoDisabled}
                label="戻る"
                icon={<UndoIcon />}
                onClick={getHistory}
              />
            </BottomNavigation>
            <BottomNavigationAdd
              label="点検機器追加"
              onClick={() => sheetController.addEquipment()}
            />
          </Grid>
        </Grid>
      </Paper >
      <InspectionItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleInspectionItem={handleInspectionItem}
      />
    </DndProvider>
  );
}
InspectionSheetForm.displayName = InspectionSheetForm.name;
