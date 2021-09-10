import React, { useContext, useState, useEffect } from 'react';
import {
  Button, BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Grid, TextField, MenuItem,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { useInputTypes } from '../Types';
import { Choice } from '../../../entities';
import { InspectionItemContext } from './../../../App';
import { isValidInspectionItem } from '../../../use-cases/InspectionItemOperator';
import { ChoiceSetSelectDialog } from './ChoiceSetSelectDialog';

interface InspectionDialogProps {
  open: boolean,
  handleClose: () => void,
  handleInspectionItem: () => void,
};

export const InspectionItemDialog = (props: InspectionDialogProps): JSX.Element => {
  const { state, useCase } = useContext(InspectionItemContext);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!isValidInspectionItem(state));
  }, [state]);

  return (
    <>
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
                value={state.inspection_content}
                onChange={(e) => useCase.updateField(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                label='点検タイプ'
                variant='outlined'
                size='small'
                name='input_type'
                value={state.input_type}
                onChange={(e) => { useCase.updateField(e); }}
              >
                {useInputTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem >
                ))}
              </TextField>
            </Grid>
            {(state.input_type !== 3) ? <></> :
              <>
                {state.choices.map((choice: Choice, index: number) =>
                  <Grid item xs={12} key={`${state.inspection_item_id}_${index}`}>
                    <TextField
                      required
                      id='outlined-required'
                      label={`選択肢${index + 1}`}
                      variant='outlined'
                      size='small'
                      name='choice'
                      value={choice.description}
                      onChange={(e) => useCase.updateChoice(e, index)}
                    />
                    <IconButton color='primary' size='small'
                      onClick={() => useCase.removeChoice(index)}
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
                      onClick={() => useCase.addChoice()}
                    />
                    <BottomNavigationAction
                      label='テンプレート選択'
                      icon={<FormatListNumberedIcon />}
                      onClick={() => setOpen(true)}
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
            onClick={props.handleInspectionItem}
          >OK</Button>
          <Button
            variant='contained'
            onClick={props.handleClose}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
      <ChoiceSetSelectDialog
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}