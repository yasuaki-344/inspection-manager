import React, { FC } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DialogTitleDesign } from "../stylesheets";

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
        <DialogTitle sx={DialogTitleDesign}>
          点検シートを削除しますか?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            次の点検シートを削除します。（この操作は取り消せません）<br/>
            シート名：{props.sheetName}<br/>
            点検グループ：{props.groupName}<br/>
            点検種別：{props.typeName}
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
