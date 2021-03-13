import React from 'react';
import { IconButton, Button, Paper, Grid, TextField, Typography } from '@material-ui/core';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

export const InspectionItemForm = (props: any): JSX.Element => {
  return (
    <Paper variant="outlined">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <IconButton color="primary"
            onClick={() => props.removeInspectionItem(
              props.equipment_id, props.inspectionItem.inspection_item_id
            )}
          >
            <RemoveCircleIcon />
            <Typography>点検項目削除</Typography>
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Typography>点検項目情報</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="outlined-required"
            label="点検項目"
            variant="outlined"
            size="small"
            name="inspection_content"
            value={props.inspectionItem.inspection_content}
            onChange={(e) => {
              props.updateInspectionItem(e,
                props.equipment_id, props.inspectionItem.inspection_item_id)
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}