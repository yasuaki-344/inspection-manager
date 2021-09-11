import React, { FC } from 'react';
import { BottomNavigationAction } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface IBottomNavigationAddActionProps {
  label: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const BottomNavigationAddAction: FC<IBottomNavigationAddActionProps> = (props): JSX.Element => {
  return (
    <BottomNavigationAction
      label={props.label}
      icon={<AddCircleIcon />}
      onClick={props.onClick}
    />
  );
}
