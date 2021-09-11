import React, { useContext, useEffect, useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Grid } from '@material-ui/core';
import { InspectionSheetForm } from './form/InspectionSheetForm';
import { InspectionSheet, InspectionSheetInitialState } from '../../entities';
import { InspectionSheetContext } from '../../App';
import { TopPageLink } from '../common';

export const Create = (): JSX.Element => {
  const { sheetPresenter, sheetController } = useContext(InspectionSheetContext);
  const [open, setOpen] = useState(false);
  const [page, setPage] = React.useState(0);
  const [inspectionSheets, setInspectionSheets] = useState<InspectionSheet[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    sheetController.setSheet(InspectionSheetInitialState);
    fetch('inspectionsheet')
      .then(res => res.json())
      .then((json: InspectionSheet[]) => {
        console.log(json);
        setInspectionSheets(json);
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage('データの取得に失敗しました');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const handleSelectSheet = (sheetId: number) => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        sheetController.setSheet(json);
      })
      .catch((error) => {
        setSuccessMessage('');
        setErrorMessage(`データの取得に失敗しました (ID:${sheetId})`);
        console.error(error);
      });
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.debug(sheetPresenter);
    fetch('inspectionsheet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sheetPresenter)
    })
      .then((res) => {
        if (res.ok) {
          setSuccessMessage('登録に成功しました');
          setErrorMessage('');
          sheetController.setSheet({
            sheet_id: 0,
            sheet_name: '',
            inspection_type_id: 0,
            inspection_group_id: 0,
            inspection_type: '',
            inspection_group: '',
            equipments: [],
          });
        } else {
          setSuccessMessage('');
          setErrorMessage('登録に失敗しました');
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
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant='contained'
            onClick={() => setOpen(true)}
          >既存のデータをコピー</Button>
        </Grid>
        {errorMessage !== '' &&
          <Grid item xs={12}>
            <MuiAlert elevation={6} variant="filled" severity="error">
              {errorMessage}
            </MuiAlert>
          </Grid>
        }
        {successMessage !== '' &&
          <Grid item xs={12}>
            <MuiAlert elevation={6} variant="filled" severity="success">
              {successMessage}
            </MuiAlert>
          </Grid>
        }
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
            rowsPerPageOptions={[5]}
            component="div"
            count={inspectionSheets.length}
            rowsPerPage={5}
            page={page}
            labelRowsPerPage={'1ページあたりの件数:'}
            backIconButtonText={'前のぺージ'}
            nextIconButtonText={'次のぺージ'}
            // onChangePage={handleChangePage}
            onPageChange={handleChangePage}
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
