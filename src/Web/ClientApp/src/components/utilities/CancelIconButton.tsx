import React, { FC } from "react";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

interface CancelIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const CancelIconButton: FC<CancelIconButtonProps> = (props) => {
  return (
    <IconButton size="small" color="secondary" onClick={props.onClick}>
      <CancelIcon />
    </IconButton>
  );
};
