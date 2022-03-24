import React, { FC } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

interface EditIconButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const EditIconButton: FC<EditIconButtonProps> = (props) => {
  return (
    <IconButton size="small" color="primary" onClick={props.onClick}>
      <EditIcon />
    </IconButton>
  );
};
