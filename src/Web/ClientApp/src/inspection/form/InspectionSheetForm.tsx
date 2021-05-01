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
import { Equipment, InspectionItem, InspectionSheet } from '../Types';

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
  const [groups, setGroups] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [additional, setAdditional] = useState(false);
  const [equipmentId, setEquipmentId] = useState('');
  const [history, setHistory] = useState<InspectionSheet[]>([]);

  useEffect(() => {
    fetch('inspectiongroup')
      .then(res => res.json())
      .then((json: string[]) => {
        setGroups(json);
      })
      .catch(console.error);
    fetch('inspectiontype')
      .then(res => res.json())
      .then((json: string[]) => {
        setTypes(json);
      })
      .catch(console.error);
  }, []);

  // eslint-disable-next-line
  const recordHistory = () => {
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
      context.addInspectionItem(equipmentId, itemContext.inspectionItem);
    } else {
      context.updateInspectionItem(equipmentId, itemContext.inspectionItem);
    }
    setOpen(false);
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: string) => {
    setEquipmentId(equipmentId);
    setAdditional(true);
    itemContext.setItem({
      inspection_item_id: Math.random().toString(36).substr(2, 9),
      inspection_content: '',
      input_type: 1,
      choices: [],
    })
    setOpen(true);
  }

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (equipmentId: string, inspectionItem: InspectionItem) => {
    setEquipmentId(equipmentId);
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
              name='inspection_group'
              value={context.inspectionSheet.inspection_group}
              onChange={e => context.updateField(e)}
            >
              {groups.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
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
              name='inspection_type'
              value={context.inspectionSheet.inspection_type}
              onChange={e => context.updateField(e)}
            >
              {types.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem >
              ))}
            </TextField>
          </Grid>
          {context.inspectionSheet.equipments.map((equipment: Equipment) =>
            <Grid item xs={12} key={equipment.equipment_id}>
              <EquipmentForm
                equipment={equipment}
                handleAddItem={handleAddItem}
                handleEditItem={handleEditItem}
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
