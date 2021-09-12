import React, { useContext, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { InspectionItemContext } from './../../../App';
import { ChoiceSetSelectDialog } from './ChoiceSetSelectDialog';
import { OkCancelDialogActions } from '../../common';

interface InspectionDialogProps {
  open: boolean,
  handleClose: () => void,
  handleInspectionItem: () => void,
};

export const InspectionItemDialog = (props: InspectionDialogProps): JSX.Element => {
  const { itemPresenter, itemController } = useContext(InspectionItemContext);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(!itemController.isValidInspectionItem(itemPresenter.getState()));
    // eslint-disable-next-line
  }, [itemPresenter.getState()]);

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>点検項目編集</DialogTitle>
        <DialogContent>
          {itemPresenter.getEditContent(() => setOpen(true))}
        </DialogContent>
        <OkCancelDialogActions
          disabled={disabled}
          onOkButtonClick={props.handleInspectionItem}
          onCancelButtonClick={props.handleClose}
        />
      </Dialog>
      <ChoiceSetSelectDialog
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
}