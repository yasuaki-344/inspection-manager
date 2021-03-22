import React, { Fragment, useState, useEffect } from 'react';
import {
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Grid, TextField, MenuItem,
  TableCell, TableRow
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { isValidInspectionItem, InspectionItemOperator } from './InspectionItemOperator';
import { useInputTypes } from './Types';

export const InspectionItemForm = (props: any): JSX.Element => {
  const [
    inspectionItem, setItem, updateField,
    addChoice, removeChoice, updateChoice
  ] = InspectionItemOperator();

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!isValidInspectionItem(inspectionItem));
  }, [inspectionItem]);

  const handleEdit = () => {
    setItem(props.inspectionItem);
    setOpen(true);
  }

  const handleUpdate = () => {
    props.updateInspectionItem(props.equipment_id, inspectionItem);
    setOpen(false);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton size='small' onClick={() => handleEdit()}>
            <EditIcon />
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {props.inspectionItem.inspection_content}
        </TableCell>
        <TableCell>
          {useInputTypes.filter(e => e.value === props.inspectionItem.input_type)[0].label}
        </TableCell>
        <TableCell>
          {props.inspectionItem.choices.join(',')}
        </TableCell>
        <TableCell align='right'>
          <IconButton color='primary' size='small'
            onClick={() => props.removeInspectionItem(
              props.equipment_id, props.inspectionItem.inspection_item_id
            )}
          >
            <CancelIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>点検項目編集</DialogTitle>
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
                value={inspectionItem.inspection_content}
                onChange={(e) => updateField(e)}
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
                value={inspectionItem.input_type}
                onChange={(e) => { updateField(e); }}
              >
                {useInputTypes.map((option) => (
                  <MenuItem  key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem >
                ))}
              </TextField>
            </Grid>
            {(inspectionItem.input_type !== 3) ? <></> :
              <>
                {inspectionItem.choices.map((choice: string, index: number) =>
                  <Grid item xs={12} key={`${inspectionItem.inspection_item_id}_${index}`}>
                    <TextField
                      required
                      id='outlined-required'
                      label={`選択肢${index + 1}`}
                      variant='outlined'
                      size='small'
                      name='choice'
                      value={choice}
                      onChange={(e) => updateChoice(e, index)}
                    />
                    <IconButton color='primary' size='small'
                      onClick={() => removeChoice(index)}
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
                      onClick={() => addChoice()}
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
            disabled={disabled}
            onClick={handleUpdate}
          >OK</Button>
          <Button
            variant='contained'
            onClick={handleClose}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}