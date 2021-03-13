import React from 'react';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { EquipmentForm } from './EquipmentForm';
import { Equipment } from './Types';

export const InspectionSheetForm = (props: any): JSX.Element => {

  const contents = props.isEdit
    ? <Grid item xs={12}>
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
    <Paper>
      <Grid container spacing={2}>
        {contents}
        <Grid item xs={12}>
          <TextField
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
          <Grid item xs={12} key={equipment.equipment_id}>
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
        <Grid item xs={12}>
          <Button size='medium' variant='contained' color='primary'
            onClick={props.addEquipment}>機器追加</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
InspectionSheetForm.displayName = InspectionSheetForm.name;
