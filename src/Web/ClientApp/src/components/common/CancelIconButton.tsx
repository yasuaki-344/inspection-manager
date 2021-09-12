import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

interface ICancelIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const CancelIconButton: FC<ICancelIconButtonProps> = (props) => {
  return (
    <IconButton
      size='small'
      color='secondary'
      onClick={props.onClick}
    >
      <CancelIcon />
    </IconButton>
  )
}