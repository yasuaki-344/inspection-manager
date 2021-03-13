import React from 'react';
import { IconButton, Grid, Paper, TextField, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { InspectionItemForm } from './InspectionItemForm';
import { InspectionItem } from './Types';

export const EquipmentForm = (props: any): JSX.Element => {
  return (
    <Paper variant="outlined">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <IconButton color="primary" onClick={() => props.removeEquipment(props.equipment.equipment_id)}>
            <RemoveCircleIcon />
            <Typography>点検機器削除</Typography>
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="点検機器名"
            variant="outlined"
            size="small"
            name="equipment_name"
            value={props.equipment.equipment_name}
            onChange={(e) => { props.updateEquipment(e, props.equipment.equipment_id) }}
          />
        </Grid>
        {props.equipment.inspection_items.map((inspectionItem: InspectionItem) =>
          <Grid item xs={12}>
            <InspectionItemForm
              key={inspectionItem.inspection_item_id}
              equipment_id={props.equipment.equipment_id}
              inspectionItem={inspectionItem}
              removeInspectionItem={props.removeInspectionItem}
              updateInspectionItem={props.updateInspectionItem}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <IconButton color="primary"
          onClick={() => props.addInspectionItem(props.equipment.equipment_id)}>
            <AddCircleIcon />
            <Typography>点検項目追加</Typography>
          </IconButton>
        </Grid>
      </Grid>
    </Paper >
  );
}