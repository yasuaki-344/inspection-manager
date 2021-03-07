import React, { useReducer } from 'react';
import { Button, Grid, TextField, Typography, Paper } from '@material-ui/core';

export const Create = (): JSX.Element => {
  // eslint-disable-next-line
  const [inspectionSheet, dispatch] = useReducer((state:any, action:any) => {
    console.log(action);
    return {...state, [action.name]: action.value};
  }, {});

  const handleChange = (event: any) => {
    dispatch({
      name : event.target.name,
      value: event.target.value
    });
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("事前確認");

    console.log(inspectionSheet);

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
                defaultValue="シート名"
                name="sheetName"
                value={inspectionSheet.sheetName}
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
