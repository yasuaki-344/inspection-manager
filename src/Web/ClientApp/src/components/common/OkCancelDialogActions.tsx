import React, { FC } from 'react';
import { Button, DialogActions } from '@mui/material';

interface IOkCancelDialogActionsProps {
  disabled: boolean,
  onOkButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  onCancelButtonClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

export const OkCancelDialogActions: FC<IOkCancelDialogActionsProps> = (props): JSX.Element => {
  return (
    <DialogActions>
      <Button
        variant='contained'
        color='primary'
        disabled={props.disabled}
        onClick={props.onOkButtonClick}
      >OK</Button>
      <Button
        variant='contained'
        color='inherit'
        onClick={props.onCancelButtonClick}
      >キャンセル</Button>
    </DialogActions>
  );
}