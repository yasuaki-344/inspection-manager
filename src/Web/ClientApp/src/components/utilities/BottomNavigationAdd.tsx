import React, { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

interface BottomNavigationAddProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const BottomNavigationAdd: FC<BottomNavigationAddProps> = (
  props
): JSX.Element => {
  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        label={props.label}
        icon={<AddCircleIcon />}
        onClick={props.onClick}
      />
    </BottomNavigation>
  );
};
