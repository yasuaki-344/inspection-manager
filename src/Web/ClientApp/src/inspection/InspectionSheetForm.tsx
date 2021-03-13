import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { Equipment, InspectionItem } from './Types';

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
          <TextField
            required
            id="outlined-required"
            label="点検機器名"
            variant="outlined"
            size="small"
            name="equipment_name"
            value={equipment.equipment_name}
            onChange={(e) => { props.updateEquipment(e, equipment.equipment_id) }}
          />
          <Button size='medium' variant='contained' color='primary'
            onClick={() => props.removeEquipment(equipment.equipment_id)}
          >
            機器削除
          </Button>
          {equipment.inspection_items.map((inspectionItem: InspectionItem) =>
            <div key={inspectionItem.inspection_item_id}>
              <div>{inspectionItem.inspection_content}</div>
              <Button size='medium' variant='contained' color='primary'
                onClick={() => props.removeInspectionItem(
                  equipment.equipment_id, inspectionItem.inspection_item_id
                )}
              >
                点検項目削除
              </Button>
            </div>
          )}
          <Button size='medium' variant='contained' color='primary'
            onClick={() => props.addInspectionItem(equipment.equipment_id)}
          >
            点検項目追加
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Button size='medium' variant='contained' color='primary'
          onClick={props.addEquipment}>機器追加</Button>
      </Grid>

    </Grid>
  );
}
InspectionSheetForm.displayName = InspectionSheetForm.name;
