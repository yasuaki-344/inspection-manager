import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface SheetDeleteConfirmationDialogProp {
  open: boolean;
  sheetName: string;
  groupName: string | undefined;
  typeName: string | undefined;
  onDeleteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onCancelClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SheetDeleteConfirmationDialog: FC<SheetDeleteConfirmationDialogProp> =
  (props: SheetDeleteConfirmationDialogProp): JSX.Element => {
    return (
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>点検シートを削除しますか?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>次の点検シートを削除します。（この操作は取り消せません）</p>
            <p>シート名：{props.sheetName}</p>
            <p>点検グループ：{props.groupName}</p>
            <p>点検種別：{props.typeName}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={props.onDeleteClick}
          >
            削除
          </Button>
          <Button variant="outlined" onClick={props.onCancelClick} autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
