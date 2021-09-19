import React, { FC, useState, useEffect } from 'react';
import {
  Grid, TextField, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import { InspectionGroup, InspectionType } from '../../typescript-fetch';
import { OkCancelDialogActions } from '../common';

interface IEditDialogProps {
  open: boolean,
  title: string,
  label: string,
  target: InspectionGroup | InspectionType,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onOkButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onCancelButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

export const EditDialog: FC<IEditDialogProps> = (props): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!props.target.description.length);
  }, [props.target]);

  return (
    <Dialog open={props.open} onClose={props.onCancelButtonClick}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              label={props.label}
              variant='outlined'
              size='small'
              name='description'
              value={props.target.description}
              onChange={props.onChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <OkCancelDialogActions
        disabled={disabled}
        onOkButtonClick={props.onOkButtonClick}
        onCancelButtonClick={props.onCancelButtonClick}
      />
    </Dialog>
  );
}
