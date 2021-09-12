import React, { FC } from "react";
import Alert from '@material-ui/lab/Alert';

interface IProcessResultProps {
  message: string;
  severity: string;
  isVisible: boolean;
  close: () => void;
}

export const ProcessResult: FC<IProcessResultProps> = (props): JSX.Element => {
  if (props.isVisible) {
    if (props.severity === 'error') {
      return <Alert variant="filled" severity='error' onClose={props.close}>
        {props.message}
      </Alert>
    } else if (props.severity === 'info') {
      return <Alert variant="filled" severity='info' onClose={props.close}>
        {props.message}
      </Alert>
    } else if (props.severity === 'success') {
      return <Alert variant="filled" severity='success' onClose={props.close}>
        {props.message}
      </Alert>
    } else if (props.severity === 'warning') {
      return <Alert variant="filled" severity='warning' onClose={props.close}>
        {props.message}
      </Alert>
    } else {
      return <></>
    }
  } else {
    return <></>
  }
}