import React, { useEffect } from 'react';
import { Button, Grid, Typography, Paper } from '@material-ui/core';
import { InspectionSheet } from './Types';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { InspectionSheetForm } from './InspectionSheetForm';

export const Edit = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [inspectionSheet, setSheet, updateField, addEquipment, removeEquipment, updateEquipment] = InspectionSheetOperator();

  useEffect(() => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setSheet(json);
      })
      .catch(console.error);
  }, [sheetId]);

  const handleUpdate = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    fetch(`inspectionsheet/${sheetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspectionSheet)
    })
      .then((res) => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setSheet(json);
      })
      .catch(console.error);
  }

  return (
    <div>
      <Typography variant="h3" >編集ページ</Typography>
      <Paper variant="outlined">
        <InspectionSheetForm
          isEdit={true}
          sheet={inspectionSheet}
          updateField={updateField}
          addEquipment={addEquipment}
          removeEquipment={removeEquipment}
          updateEquipment={updateEquipment}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              size='medium'
              variant='contained'
              color='primary'
              onClick={handleUpdate}
            >
              更新
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
Edit.displayName = Edit.name;
