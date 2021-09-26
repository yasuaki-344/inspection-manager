import React, { useContext, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import nameof from "ts-nameof.macro";
import { DIContainerContext } from "../../App";
import { ChoiceSetSelectDialog } from "./ChoiceSetSelectDialog";
import { OkCancelDialogActions } from "../utilities";
import { DialogTitleDesign } from "../stylesheets";
import { IInspectionItemPresenter } from "../../interfaces/presenter";

interface InspectionDialogProps {
  open: boolean;
  onCancelButtonClick: () => void;
  onOkButtonClick: () => void;
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
  }, [itemPresenter.state]);

  return (
    <>
      <Dialog open={props.open} onClose={props.onCancelButtonClick}>
        <DialogTitle sx={DialogTitleDesign}>点検項目編集</DialogTitle>
        <DialogContent>
          {itemPresenter.getEditContent(() => setOpen(true))}
        </DialogContent>
        <OkCancelDialogActions
          disabled={disabled}
          onOkButtonClick={props.onOkButtonClick}
          onCancelButtonClick={props.onCancelButtonClick}
        />
      </Dialog>
      <ChoiceSetSelectDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};
