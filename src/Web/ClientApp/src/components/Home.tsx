import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper
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

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>点検シート一覧</h1>
      <Link to="/create">新規作成</Link>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
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
            {inspectionSheets.map((sheet: any) =>
              <TableRow key={sheet.sheet_id}>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleDownload(sheet.sheet_id)}
                  >
                    <GetAppIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {sheet.sheet_name}
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell>
                  <Link to={"/edit/" + sheet.sheet_id}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell>
                  <Link to={"/details/" + sheet.sheet_id}>
                    <DetailsIcon />
                  </Link>
                </TableCell>
                <TableCell>
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
            onClick={handleClose}
            autoFocus
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
Home.displayName = Home.name;
