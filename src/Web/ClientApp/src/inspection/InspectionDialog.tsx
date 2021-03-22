import React, { ChangeEvent } from 'react';
import {
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Grid, TextField, MenuItem,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useInputTypes, InspectionItem } from './Types';

interface InspectionDialogProps {
  open: boolean,
  disabled: boolean,
  inspectionItem: InspectionItem,
  handleClose: () => void,
  updateField: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  addChoice: () => void,
  updateChoice: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => void,
  removeChoice: (index: number) => void,
  handleInspectionItem: () => void,
};

export const InspectionDialog = (props: InspectionDialogProps): JSX.Element => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>点検項目編集</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoFocus
              id='outlined-required'
              label='点検項目'
              variant='outlined'
              size='small'
              name='inspection_content'
              value={props.inspectionItem.inspection_content}
              onChange={(e) => props.updateField(e)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              select
              id='outlined-required'
              label='点検タイプ'
              variant='outlined'
              size='small'
              name='input_type'
              value={props.inspectionItem.input_type}
              onChange={(e) => { props.updateField(e); }}
            >
              {useInputTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem >
              ))}
            </TextField>
          </Grid>
          {(props.inspectionItem.input_type !== 3) ? <></> :
            <>
              {props.inspectionItem.choices.map((choice: string, index: number) =>
                <Grid item xs={12} key={`${props.inspectionItem.inspection_item_id}_${index}`}>
                  <TextField
                    required
                    id='outlined-required'
                    label={`選択肢${index + 1}`}
                    variant='outlined'
                    size='small'
                    name='choice'
                    value={choice}
                    onChange={(e) => props.updateChoice(e, index)}
                  />
                  <IconButton color='primary' size='small'
                    onClick={() => props.removeChoice(index)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Grid>
              )}
              <Grid item xs={12}>
                <BottomNavigation showLabels>
                  <BottomNavigationAction
                    label='選択肢追加'
                    icon={<AddCircleIcon />}
                    onClick={props.addChoice}
                  />
                </BottomNavigation>
              </Grid>
            </>
          }
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant='contained'
          color='primary'
          disabled={props.disabled}
          onClick={props.handleInspectionItem}
        >OK</Button>
        <Button
          variant='contained'
          onClick={props.handleClose}
        >キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}