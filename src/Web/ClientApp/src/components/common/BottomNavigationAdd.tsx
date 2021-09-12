import React, { FC } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

interface IBottomNavigationAddProps {
  label: string,
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
};

export const BottomNavigationAdd: FC<IBottomNavigationAddProps> = (props): JSX.Element => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label={props.label}
        icon={<AddCircleIcon />}
        onClick={props.onClick}
      />
    </BottomNavigation>
  );
}
