import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper
} from '@material-ui/core';
import { InspectionSheet } from '../inspection/Types';

export const Home = (): JSX.Element => {
  const [inspectionSheets, setInspectionSheets] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [targetSheetId, setTargetSheetId] = React.useState("");
  const [targetSheetName, setTargetSheetName] = React.useState("");

  useEffect(() => {
    console.log("called");
    fetch('inspectionsheet')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch(console.error);
  }, []);

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
              <TableCell>点検シート名</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspectionSheets.map((sheet: any) =>
              <TableRow key={sheet.sheet_id}>
                <TableCell>
                  {sheet.sheet_name}
                </TableCell>
                <TableCell>
                  <Link to={"/edit/" + sheet.sheet_id}>編集</Link>|
                  <Link to={"/details/" + sheet.sheet_id}>詳細</Link>|
                  <Button
                      size='small'
                      variant='contained'
                      color='secondary'
                      onClick={() => handleClickOpen(
                          sheet.sheet_id, sheet.sheet_name
                      )}
                  >
                    削除
                  </Button>
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
          <Button onClick={handleDelete} color="primary">削除</Button>
          <Button onClick={handleClose} color="primary" autoFocus>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}
Home.displayName = Home.name;
