import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { InspectionItem } from './Types';

export const EquipmentForm = (props: any): JSX.Element => {
  return (
    <Grid item xs={12} key={props.equipment.equipment_id}>
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
      <Button size='medium' variant='contained' color='primary'
        onClick={() => props.removeEquipment(props.equipment.equipment_id)}
      >
        機器削除
    </Button>
      {props.equipment.inspection_items.map((inspectionItem: InspectionItem) =>
        <div key={inspectionItem.inspection_item_id}>
          <TextField
            required
            id="outlined-required"
            label="点検項目"
            variant="outlined"
            size="small"
            name="inspection_content"
            value={inspectionItem.inspection_content}
            onChange={(e) => {
              props.updateInspectionItem(e,
                props.equipment.equipment_id, inspectionItem.inspection_item_id)
            }}
          />

          <Button size='medium' variant='contained' color='primary'
            onClick={() => props.removeInspectionItem(
              props.equipment.equipment_id, inspectionItem.inspection_item_id
            )}
          >
            点検項目削除
        </Button>
        </div>
      )}
      <Button size='medium' variant='contained' color='primary'
        onClick={() => props.addInspectionItem(props.equipment.equipment_id)}
      >
        点検項目追加
    </Button>
    </Grid>
  );
}