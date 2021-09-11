import React, { FC } from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

interface IEditIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const EditIconButton: FC<IEditIconButtonProps> = (props) => {
  return (
    <IconButton
      size='small'
      color='primary'
      onClick={props.onClick}
    >
      <EditIcon />
    </IconButton>
  )
}