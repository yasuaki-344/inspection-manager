import React, { useContext, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import nameof from "ts-nameof.macro";
import { DIContainerContext } from "../../App";
import { ChoiceSetSelectDialog } from "./ChoiceSetSelectDialog";
import { OkCancelDialogActions } from "../common";
import { DialogTitleDesign } from "../stylesheets";
import { IInspectionItemPresenter } from "../../interfaces/presenter";

interface InspectionDialogProps {
  open: boolean;
  handleClose: () => void;
  handleInspectionItem: () => void;
}

export const InspectionItemDialog = (
  props: InspectionDialogProps
): JSX.Element => {
  const container = useContext(DIContainerContext);
  const itemPresenter: IInspectionItemPresenter = container.inject(
    nameof<IInspectionItemPresenter>()
  );
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!itemPresenter.isValidInspectionItem());
  }, [itemPresenter.getState()]);

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle sx={DialogTitleDesign}>点検項目編集</DialogTitle>
        <DialogContent>
          {itemPresenter.getEditContent(() => setOpen(true))}
        </DialogContent>
        <OkCancelDialogActions
          disabled={disabled}
          onOkButtonClick={props.handleInspectionItem}
          onCancelButtonClick={props.handleClose}
        />
      </Dialog>
      <ChoiceSetSelectDialog open={open} handleClose={() => setOpen(false)} />
    </>
  );
};
