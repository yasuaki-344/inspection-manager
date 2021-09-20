import React, { FC } from "react";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface ICancelIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const CancelIconButton: FC<ICancelIconButtonProps> = (props) => {
  return (
    <IconButton size="small" color="secondary" onClick={props.onClick}>
      <CancelIcon />
    </IconButton>
  );
};
