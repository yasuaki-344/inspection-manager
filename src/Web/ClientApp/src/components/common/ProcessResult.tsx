import React, { FC } from "react";
import { Alert, Snackbar } from '@mui/material';

interface IProcessResultProps {
  open: boolean;
  severity: string;
  message: string;
  onClose: (event: React.SyntheticEvent<Element, Event>) => void;
}

export const ProcessResult: FC<IProcessResultProps> = (props): JSX.Element => {
  const duration = 3000;
  const vertical = 'bottom';
  const horizontal = 'right';

  const alert = (props.severity === 'success') ?
    <Alert severity='success' onClose={props.onClose}>
      {props.message}
    </Alert> :
    (props.severity === 'error') ?
      <Alert severity='error' onClose={props.onClose}>
        {props.message}
      </Alert> :
      <></>

  return (
    <Snackbar
      open={props.open}
      autoHideDuration={duration}
      onClose={props.onClose}
      anchorOrigin={{ vertical, horizontal }}
    >
      {alert}
    </Snackbar>
  );
}
