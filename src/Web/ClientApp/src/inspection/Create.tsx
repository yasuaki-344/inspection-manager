import React from 'react';
import { Button, Grid, TextField, Typography, Paper } from '@material-ui/core';
import { InspectionSheetOperator } from './InspectionSheetOperator';

export const Create = (): JSX.Element => {
  const [inspectionSheet, updateField] = InspectionSheetOperator();

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
