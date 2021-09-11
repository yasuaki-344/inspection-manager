import React, { FC, useState, useEffect } from 'react';
import {
  Dialog, DialogContent, DialogTitle, Grid, TextField,
} from '@material-ui/core';
import { ChoiceTemplate, Option } from '../../typescript-fetch';
import { BottomNavigationAdd, CancelIconButton, OkCancelDialogActions } from '../common';

interface IChoiceTemplateEditDialogProps {
  open: boolean,
  target: ChoiceTemplate,
  setTarget: any,
  onOkButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onCancelButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const ChoiceTemplateEditDialog: FC<IChoiceTemplateEditDialogProps> = (props): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (!props.target.choices.length) {
      setDisabled(true);
    } else {
      const index = props.target.choices.findIndex(x => x.description === '');
      setDisabled(index !== -1);
    }
  }, [props.target]);

  return (
    <Dialog open={props.open} onClose={props.onCancelButtonClick}>
      <DialogTitle>選択肢テンプレート編集</DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {props.target.choices.map((choice: Option, index: number) =>
            <Grid item xs={12} key={index}>
              <TextField
                required
                id='outlined-required'
                label={`選択肢${index + 1}`}
                variant='outlined'
                size='small'
                name='choice'
                value={choice.description}
                onChange={(e) => props.setTarget({
                  ...props.target,
                  'choices': props.target.choices.map((value: Option, i: number) => {
                    return i !== index ? value : {
                      option_id: value.option_id,
                      description: e.target.value
                    };
                  }),
                })}
              />
              <CancelIconButton
                onClick={() => props.setTarget({
                  ...props.target,
                  'choices': props.target.choices.filter(
                    (value: Option, i: number) => i !== index
                  ),
                })}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <BottomNavigationAdd
              label='選択肢追加'
              onClick={() => props.setTarget({
                ...props.target,
                'choices': props.target.choices.concat({
                  option_id: 0,
                  description: ''
                }),
              })}
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
