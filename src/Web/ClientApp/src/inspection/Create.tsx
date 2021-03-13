import React from 'react';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { InspectionSheetForm } from './InspectionSheetForm';

export const Create = (): JSX.Element => {
  const [
    inspectionSheet,, updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem
  ] = InspectionSheetOperator();

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
          <InspectionSheetForm
            isEdit={false}
            sheet={inspectionSheet}
            updateField={updateField}
            addEquipment={addEquipment}
            removeEquipment={removeEquipment}
            updateEquipment={updateEquipment}
            addInspectionItem={addInspectionItem}
            removeInspectionItem={removeInspectionItem}
          />
          <Grid container spacing={1}>
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
