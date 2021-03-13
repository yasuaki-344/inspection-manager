import React from 'react';
import { Button, TextField } from '@material-ui/core';

export const InspectionItemForm = (props: any): JSX.Element => {
  return (
    <div>
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

      <Button size='medium' variant='contained' color='primary'
        onClick={() => props.removeInspectionItem(
          props.equipment_id, props.inspectionItem.inspection_item_id
        )}
      >
        点検項目削除
        </Button>
    </div>
  );
}