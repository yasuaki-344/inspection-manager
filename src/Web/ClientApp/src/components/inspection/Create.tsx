import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@mui/material';
import { InspectionSheetForm } from './form/InspectionSheetForm';
import { InspectionSheet, InspectionSheetInitialState } from '../../entities';
import { InspectionSheetContext } from '../../App';
import { TopPageLink } from '../common';
import { Notification, NotificationInitState, NotificationStateInteractor } from '../common/Notification';

export const Create = (): JSX.Element => {
  const { sheetPresenter, sheetController } = useContext(InspectionSheetContext);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [inspectionSheets, setInspectionSheets] = useState<InspectionSheet[]>([]);
  const notification = new NotificationStateInteractor(useState(NotificationInitState));

  useEffect(() => {
    sheetController.setSheet(InspectionSheetInitialState);
    sheetController.getAllInspectionSheet()
      .then((json: InspectionSheet[]) => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch((error) => {
        notification.setMessageState('error', 'データの取得に失敗しました');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Changes page number to display.
   * @param event Page number change event.
   * @param newPage New page number.
   */
  // eslint-disable-next-line
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Set the specified inspection sheet.
   * @param sheetId Sheet ID of inspection sheet to set.
   */
  const handleSelectSheet = (sheetId: number) => {
    sheetController.getInspectionSheetById(sheetId)
      .catch((error) => {
        notification.setMessageState('error', `データの取得に失敗しました (ID:${sheetId})`);
        console.error(error);
      });
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug(sheetPresenter);
    sheetController.createInspectionSheet()
      .then(() => {
        notification.setMessageState('success', '登録に成功しました');
      })
      .catch(error => {
        console.error(error);
        notification.setMessageState('error', '登録に失敗しました');
      });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>新規作成ページ</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={() => setOpen(true)}
          >既存のデータをコピー</Button>
        </Grid>
        <Grid item xs={12}>
          <form data-testid='form' onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <InspectionSheetForm isEdit={false} />
              </Grid>
              <Grid item xs={12}>
                <Button type='submit' variant='contained' color='primary'>新規作成</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      <Notification
        open={notification.state.isOpen}
        severity={notification.state.severity}
        message={notification.state.message}
        onClose={() => { notification.hideDisplay() }}
      />
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
                  .map((sheet: InspectionSheet) =>
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
            component="div"
            count={inspectionSheets.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={5}
            rowsPerPageOptions={[5]}
            labelRowsPerPage={'1ページあたりの件数:'}
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
