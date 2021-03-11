import React from 'react';
import { Button, Grid, TextField, Typography, Paper } from '@material-ui/core';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { Equipment } from './Types';
import { InspectionSheetForm } from './InspectionSheetForm';

export const Create = (): JSX.Element => {
  const [inspectionSheet, updateField, addEquipment, removeEquipment, updateEquipment] = InspectionSheetOperator();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateField(event);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('inspectionsheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspectionSheet)
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <div>
      <Typography variant="h3" >新規作成ページ</Typography>
      <form onSubmit={handleSubmit}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                id="outlined-required"
                label="点検シート名"
                variant="outlined"
                size="small"
                name="sheet_name"
                value={inspectionSheet.sheet_name}
                onChange={handleChange}
              />
            </Grid>
            {inspectionSheet.equipments.map((equipment: Equipment) =>
              <Grid item xs={12} key={equipment.equipment_id}>
                <TextField
                  required
                  id="outlined-required"
                  label="点検機器名"
                  variant="outlined"
                  size="small"
                  name="equipment_name"
                  value={equipment.equipment_name}
                  onChange={(e) => { updateEquipment(e, equipment.equipment_id) }}
                />
                <Button size='medium' variant='contained' color='primary' onClick={() => removeEquipment(equipment.equipment_id)}>機器削除</Button>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button size='medium' variant='contained' color='primary' onClick={addEquipment}>機器追加</Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" size='medium' variant='contained' color='primary'>新規作成</Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
Create.displayName = Create.name;
