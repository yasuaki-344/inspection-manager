import React, { FC, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { InspectionSheet } from "../../entities";
import { DialogTitleDesign } from "../stylesheets";

interface OriginalSheetSelectDialogProp {
  open: boolean;
  inspectionSheets: Array<InspectionSheet>;
  onSelectClick: (sheetId: number) => void;
  onCancelClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const OriginalSheetSelectDialog: FC<OriginalSheetSelectDialogProp> = (
  props: OriginalSheetSelectDialogProp
): JSX.Element => {
  const [page, setPage] = useState(0);

  /**
   * Changes page number to display.
   * @param event Page number change event.
   * @param newPage New page number.
   */
  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Dialog open={props.open} onClose={props.onCancelClick}>
      <DialogTitle sx={DialogTitleDesign}>
        コピーする点検シートを選択
      </DialogTitle>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>点検シート名</TableCell>
                <TableCell>点検グループ</TableCell>
                <TableCell>点検種別</TableCell>
                <TableCell>&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.inspectionSheets
                .slice(page * 5, page * 5 + 5)
                .map((sheet: InspectionSheet) => (
                  <TableRow key={sheet.sheetId}>
                    <TableCell>{sheet.sheetName}</TableCell>
                    <TableCell>{sheet.inspectionGroup}</TableCell>
                    <TableCell>{sheet.inspectionType}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          props.onSelectClick(sheet.sheetId);
                        }}
                      >
                        選択
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={props.inspectionSheets.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={5}
          rowsPerPageOptions={[5]}
          labelRowsPerPage="1ページあたりの件数:"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="inherit"
          onClick={props.onCancelClick}
        >
          キャンセル
        </Button>
      </DialogActions>
    </Dialog>
  );
};
