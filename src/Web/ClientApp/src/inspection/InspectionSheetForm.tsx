import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Fab, Grid, Paper, TextField } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { EquipmentForm } from './EquipmentForm';
import { Equipment } from './Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sheetLabel: {
      backgroundColor: theme.palette.primary.main,
      color: "#FFFFFF",
      fontSize: 24,
      padding: 4
    },
    sheetElement : {
      margin: 4
    }
  })
);

export const InspectionSheetForm = (props: any): JSX.Element => {
  const classes = useStyles();

  const contents = props.isEdit
    ? <Grid item xs={12} className={classes.sheetElement}>
      <TextField
        fullWidth
        id="outlined-required"
        label="点検シートID"
        variant="outlined"
        size="small"
        name="sheet_id"
        defaultValue={props.sheet.sheet_id}
        value={props.sheet.sheet_id}
        InputProps={{ readOnly: true, }}
      />
    </Grid>
    : <></>;

  return (
    <Paper variant="outlined">
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.sheetLabel}>点検シート情報</div>
        </Grid>
        {contents}
        <Grid item xs={12} className={classes.sheetElement}>
          <TextField
            className={classes.sheetElement}
            required
            id="outlined-required"
            label="点検シート名"
            variant="outlined"
            size="small"
            name="sheet_name"
            value={props.sheet.sheet_name}
            onChange={e => {
              props.updateField(e);
            }}
          />
        </Grid>
        {props.sheet.equipments.map((equipment: Equipment) =>
          <Grid item xs={12} key={equipment.equipment_id} className={classes.sheetElement}>
            <EquipmentForm
              equipment={equipment}
              addEquipment={props.addEquipment}
              removeEquipment={props.removeEquipment}
              updateEquipment={props.updateEquipment}
              addInspectionItem={props.addInspectionItem}
              removeInspectionItem={props.removeInspectionItem}
              updateInspectionItem={props.updateInspectionItem}
            />
          </Grid>
        )}
        <Grid item xs={12} className={classes.sheetElement}>
          <Fab color="primary" variant="extended" onClick={props.addEquipment}>
            <AddCircleIcon />
            点検機器追加
          </Fab>
        </Grid>
      </Grid>
    </Paper >
  );
}
InspectionSheetForm.displayName = InspectionSheetForm.name;
