import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DetailsIcon from '@material-ui/icons/Details';

import { InspectionSheet } from '../inspection/Types';

export const Home = (): JSX.Element => {
  const [inspectionSheets, setInspectionSheets] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [targetSheetId, setTargetSheetId] = React.useState("");
  const [targetSheetName, setTargetSheetName] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    fetch('inspectionsheet')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch(console.error);
  }, []);

  const handleDownload = (sheetId: string) => {
    fetch(`excelsheet/${sheetId}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'sample.xlsx';
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1E4);
      })
      .catch(console.error);
  }

  const handleClickOpen = (sheetId: string, sheetName: string) => {
    setTargetSheetId(sheetId);
    setTargetSheetName(sheetName);
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    console.log(`delete ${targetSheetId}`);
    fetch(`inspectionsheet/${targetSheetId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setInspectionSheets(
          inspectionSheets.filter((x: InspectionSheet) =>
            x.sheet_id !== json.sheet_id)
        );
      })
      .catch(console.error);
  }

  /**
   * Changes page number to display.
   * @param event Page number change event.
   * @param newPage New page number.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Change the number of items to display per page.
   * @param event Change event for the number of items to display per page.
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h1>点検シート一覧</h1>
      <Link to="/create">新規作成</Link>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>点検シート名</TableCell>
              <TableCell>点検グループ</TableCell>
              <TableCell>点検種別</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspectionSheets
             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             .map((sheet: InspectionSheet) =>
              <TableRow key={sheet.sheet_id}>
                <TableCell padding='checkbox'>
                  <IconButton
                    size="small"
                    onClick={() => handleDownload(sheet.sheet_id)}
                  >
                    <GetAppIcon />
                  </IconButton>
                </TableCell>
                <TableCell>{sheet.sheet_name}</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell padding='checkbox'>
                  <Link to={"/edit/" + sheet.sheet_id}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell padding='checkbox'>
                  <Link to={"/details/" + sheet.sheet_id}>
                    <DetailsIcon />
                  </Link>
                </TableCell>
                <TableCell padding='checkbox'>
                  <IconButton
                    size="small"
                    color='secondary'
                    onClick={() => handleClickOpen(
                      sheet.sheet_id, sheet.sheet_name
                    )}
                  >
                    <CancelIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={inspectionSheets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage={'1ページあたりの件数:'}
        backIconButtonText={'前のぺージ'}
        nextIconButtonText={'次のぺージ'}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"点検シートを削除しますか?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p>次の点検シートを削除します。（この操作は取り消せません）</p>
            <p>シート名：{targetSheetName}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={handleDelete}
          >削除</Button>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
            autoFocus
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
Home.displayName = Home.name;
