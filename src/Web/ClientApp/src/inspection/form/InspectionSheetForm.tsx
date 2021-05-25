import React, { FC, useContext, useEffect, useState } from 'react';
import { DndProvider } from "react-dnd"
import { HTML5Backend } from 'react-dnd-html5-backend';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  BottomNavigation, BottomNavigationAction,
  MenuItem, Grid, Paper, TextField
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import UndoIcon from '@material-ui/icons/Undo';
import { EquipmentForm } from './EquipmentForm';
import { InspectionItemDialog } from '../dialog/InspectionItemDialog';
import { InspectionSheetContext } from '../context/InspectionSheetContext';
import { InspectionItemContext } from '../context/InspectionItemContext';
import {
  InspectionGroup, InspectionType,
  Equipment, InspectionItem, InspectionSheet
} from '../Types';

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
  const context = useContext(InspectionSheetContext);
  const itemContext = useContext(InspectionItemContext);
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [open, setOpen] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [additional, setAdditional] = useState(false);
  const [equipmentIndx, setEquipmentIndex] = useState(0);
  const [history, setHistory] = useState<InspectionSheet[]>([]);

  useEffect(() => {
    fetch('inspectiongroup')
      .then(res => res.json())
      .then((json: InspectionGroup[]) => {
        setGroups(json);
      })
      .catch(console.error);
    fetch('inspectiontype')
      .then(res => res.json())
      .then((json: InspectionType[]) => {
        setTypes(json);
      })
      .catch(console.error);
  }, []);

  const storeHistory = () => {
    setHistory(history.concat(context.inspectionSheet));
    setUndoDisabled(false);
  }

  const getHistory = () => {
    const sheet = history.pop();
    if (sheet != null) {
      context.setSheet(sheet);
      setUndoDisabled(!history.length);
    }
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      context.addInspectionItem(equipmentIndx, itemContext.inspectionItem);
    } else {
      context.updateInspectionItem(equipmentIndx, itemContext.inspectionItem);
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
    itemContext.setItem({
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
  const handleEditItem = (equipmentId: number, inspectionItem: InspectionItem) => {
    setEquipmentIndex(equipmentId);
    setAdditional(false);
    itemContext.setItem(inspectionItem);
    setOpen(true);
  }

  const contents = isEdit
    ? <Grid item xs={12}>
      <TextField
        className={classes.sheetIdElement}
        id="outlined-required"
        label="点検シートID"
        variant="outlined"
        size="small"
        name="sheet_id"
        defaultValue={context.inspectionSheet.sheet_id}
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
              value={context.inspectionSheet.sheet_name}
              onChange={e => context.updateField(e)}
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
              value={context.inspectionSheet.inspection_group_id}
              onChange={e => context.updateField(e)}
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
              value={context.inspectionSheet.inspection_type_id}
              onChange={e => context.updateField(e)}
            >
              {types.map((option: InspectionType) => (
                <MenuItem key={option.inspection_type_id} value={option.inspection_type_id}>
                  {option.description}
                </MenuItem >
              ))}
            </TextField>
          </Grid>
          {context.inspectionSheet.equipments.map((equipment: Equipment, index: number) =>
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
              <BottomNavigationAction
                label="点検機器追加"
                icon={<AddCircleIcon />}
                onClick={context.addEquipment}
              />
            </BottomNavigation>
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
