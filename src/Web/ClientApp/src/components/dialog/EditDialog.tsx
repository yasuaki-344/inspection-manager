import React, { FC, useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { InspectionGroup, InspectionType } from "../../entities";
import { OkCancelDialogActions } from "../utilities";
import { DialogTitleDesign } from "../stylesheets";

interface EditDialogProps {
  open: boolean;
  title: string;
  label: string;
  target: InspectionGroup | InspectionType;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOkButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onCancelButtonClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const EditDialog: FC<EditDialogProps> = (props): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(!props.target.description.length);
  }, [props.target]);

  return (
    <Dialog open={props.open} onClose={props.onCancelButtonClick}>
      <DialogTitle sx={DialogTitleDesign}>{props.title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={1} sx={{ pt: 1.5 }}>
          <Grid item xs={12}>
            <TextField
              required
              label={props.label}
              variant="outlined"
              size="small"
              name="description"
              value={props.target.description}
              onChange={props.onChange}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <OkCancelDialogActions
        disabled={disabled}
        onOkButtonClick={props.onOkButtonClick}
        onCancelButtonClick={props.onCancelButtonClick}
      />
    </Dialog>
  );
};
