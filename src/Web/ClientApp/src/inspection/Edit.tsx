import React, { useEffect } from 'react';
import { Button, Grid, TextField, Typography, Paper } from '@material-ui/core';
import { Equipment, InspectionSheet } from './Types';
import { InspectionSheetOperator } from './InspectionSheetOperator';

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" >編集ページ</Typography>
      </Grid>
      <Grid item xs={12}>
        <Paper variant="outlined">
          <TextField
            fullWidth
            id="outlined-required"
            label="点検シートID"
            variant="outlined"
            size="small"
            name="sheet_id"
            defaultValue={inspectionSheet.sheet_id}
            value={inspectionSheet.sheet_id}
            margin="normal"
            InputProps={{ readOnly: true, }}
          />
          <TextField
            required
            id="outlined-required"
            label="点検シート名"
            variant="outlined"
            size="small"
            name="sheet_name"
            value={inspectionSheet.sheet_name}
            onChange={e => {
              updateField(e);
            }}
            margin="normal"
          />
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
            <Button
              size='medium'
              variant='contained'
              color='primary'
              onClick={handleUpdate}
            >
              更新
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
Edit.displayName = Edit.name;
