import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { InspectionSheetOperator } from './InspectionSheetOperator';
import { InspectionSheetForm } from './InspectionSheetForm';
import { InspectionSheet, InspectionSheetSummary } from './Types';
import { InspectionSheetContext } from './InspectionSheetContext';

export const Create = (): JSX.Element => {
  const context = useContext(InspectionSheetContext);
  const [
    , , updateField,
    addEquipment, removeEquipment, updateEquipment,
    addInspectionItem, removeInspectionItem, updateInspectionItem,
  ] = InspectionSheetOperator();

  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [inspectionSheets, setInspectionSheets] = useState<InspectionSheetSummary[]>([]);

  useEffect(() => {
    fetch('inspectionsheet')
      .then(res => res.json())
      .then((json: InspectionSheetSummary[]) => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch(console.error);
  }, []);

  /**
   * Changes page number to display.
   * @param event Page number change event.
   * @param newPage New page number.
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Set the specified inspection sheet.
   * @param sheetId Sheet ID of inspection sheet to set.
   */
  const handleSelectSheet = (sheetId: string) => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        context.setSheet(json);
      })
      .catch(console.error);
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug(context.inspectionSheet);
    fetch('inspectionsheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(context.inspectionSheet)
    })
      .then((res) => {
        if (res.ok) {
          alert('登録に成功しました');
        } else {
          alert('登録に失敗しました')
        }
        return res.json();
      })
      .then(console.log)
      .catch(console.error);
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>新規作成ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <Link to='/'>トップページへ戻る</Link>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={() => setOpen(true)}
          >既存のデータをコピー</Button>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InspectionSheetForm
                  isEdit={false}
                  sheet={context.inspectionSheet}
                  updateField={updateField}
                  addEquipment={addEquipment}
                  removeEquipment={removeEquipment}
                  updateEquipment={updateEquipment}
                  addInspectionItem={addInspectionItem}
                  removeInspectionItem={removeInspectionItem}
                  updateInspectionItem={updateInspectionItem}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>新規作成</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>コピーする点検シートを選択</DialogTitle>
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
                {inspectionSheets
                  .slice(page * 5, page * 5 + 5)
                  .map((sheet: InspectionSheetSummary) =>
                    <TableRow key={sheet.sheet_id}>
                      <TableCell>{sheet.sheet_name}</TableCell>
                      <TableCell>{sheet.inspection_group}</TableCell>
                      <TableCell>{sheet.inspection_type}</TableCell>
                      <TableCell>
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={() => handleSelectSheet(sheet.sheet_id)}
                        >選択</Button>
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={inspectionSheets.length}
            rowsPerPage={5}
            page={page}
            labelRowsPerPage={'1ページあたりの件数:'}
            backIconButtonText={'前のぺージ'}
            nextIconButtonText={'次のぺージ'}
            onChangePage={handleChangePage}
          />

        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
Create.displayName = Create.name;
