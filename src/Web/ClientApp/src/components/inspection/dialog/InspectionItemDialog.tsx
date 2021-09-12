import React, { useContext, useState, useEffect } from 'react';
import {
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogContent, DialogTitle,
  Grid, TextField, MenuItem,
} from '@material-ui/core';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import { useInputTypes } from '../../../entities';
import { Choice } from '../../../entities';
import { InspectionItemContext } from './../../../App';
import { ChoiceSetSelectDialog } from './ChoiceSetSelectDialog';
import { BottomNavigationAdd, CancelIconButton, OkCancelDialogActions } from '../../common';

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
    setDisabled(!useCase.isValidInspectionItem(state));
    // eslint-disable-next-line
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
                    <CancelIconButton
                      onClick={() => useCase.removeChoice(index)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <BottomNavigationAdd
                    label='選択肢追加'
                    onClick={() => useCase.addChoice()}
                  />
                  <BottomNavigation showLabels>
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
        <OkCancelDialogActions
          disabled={disabled}
          onOkButtonClick={props.handleInspectionItem}
          onCancelButtonClick={props.handleClose}
        />
      </Dialog>
      <ChoiceSetSelectDialog
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}