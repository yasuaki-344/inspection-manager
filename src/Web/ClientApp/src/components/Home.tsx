import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button, ButtonGroup, Container, IconButton, Grid, TextField,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import DetailsIcon from '@material-ui/icons/Details';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import SearchIcon from '@material-ui/icons/Search';
import { InspectionSheet } from '../entities';
import { initialState } from '../inspection/operator/InspectionSheetOperator';
import {
  InspectionGroup, InspectionGroupsApi,
  InspectionType, InspectionTypesApi
} from '../typescript-fetch';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchItem: {
      margin: 2,
    },
  })
);

const groupApi = new InspectionGroupsApi();
const typeApi = new InspectionTypesApi();

export const Home: FC = (): JSX.Element => {
  const classes = useStyles();

  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [inspectionSheets, setInspectionSheets] = useState<InspectionSheet[]>([]);
  const [filteredInspectionSheets, setFilteredInspectionSheets] = useState<InspectionSheet[]>([]);
  const [open, setOpen] = useState(false);
  const [targetSheet, setTargetSheet] = useState<InspectionSheet>(initialState());
  const [searchOption, setSearchOption] = useState({
    sheet_name: '',
    inspection_group: '',
    inspection_type: '',
  })
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    groupApi.inspectionGroupsGet()
      .then(res => { setGroups(res); })
      .catch(console.error);

    typeApi.inspectionTypesGet()
      .then(res => { setTypes(res); })
      .catch(console.error);

    fetch('inspectionsheet')
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheets(json);
        setFilteredInspectionSheets(json);
      })
      .catch(console.error);
  }, []);

  /**
   * Updates search option setting with given change event paramter.
   * @param e Change event which contains search option member name and its value.
   */
  const handleSearchOption = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchOption({
      ...searchOption,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Executes to search inspection sheet based on search options.
   */
  const handleSearch = () => {
    const filteredGroupIds = groups.filter(x =>
      x.description.includes(searchOption.inspection_group)
    ).map(x => x.inspection_group_id);
    const filteredTypeIds = types.filter(x =>
      x.description.includes(searchOption.inspection_type)
    ).map(x => x.inspection_type_id);

    setFilteredInspectionSheets(
      inspectionSheets.filter((x: InspectionSheet) =>
        x.sheet_name.includes(searchOption.sheet_name) &&
        filteredGroupIds.includes(x.inspection_group_id) &&
        filteredTypeIds.includes(x.inspection_type_id)
      )
    );
    setPage(0);
  };

  /**
   * Reset search options.
   */
  const handleResetSearchOption = () => {
    setSearchOption({
      sheet_name: '',
      inspection_group: '',
      inspection_type: '',
    });
    setFilteredInspectionSheets(inspectionSheets);
    setPage(0);
  };

  const handleDownload = (sheet: InspectionSheet) => {
    fetch(`excelsheet/${sheet.sheet_id}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = `${sheet.sheet_name}.xlsx`;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1E4);
      })
      .catch(console.error);
  }

  const handleExportJson = (sheet: InspectionSheet) => {
    fetch(`jsonexport/${sheet.sheet_id}`)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.download = `${sheet.sheet_name}.json`;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1E4);
      })
      .catch(console.error);
  }

  const handleClickOpen = (sheet: InspectionSheet) => {
    setTargetSheet(sheet);
    setOpen(true);
  };

  const handleDelete = () => {
    setOpen(false);
    console.log(`delete ${targetSheet.sheet_id}`);
    fetch(`inspectionsheet/${targetSheet.sheet_id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json: InspectionSheet) => {
        console.log(json);
        setInspectionSheets(
          inspectionSheets.filter((x: InspectionSheet) =>
            x.sheet_id !== json.sheet_id)
        );
        setFilteredInspectionSheets(
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>点検シート一覧</h1>
        </Grid>
        <Grid item xs={12}>
          <Link to='/create'>新規作成</Link>
        </Grid>
        <Grid item xs={12}>
          <Container fixed={true}>
            <TextField
              className={classes.searchItem}
              label='点検シート名'
              variant='outlined'
              size='small'
              name='sheet_name'
              value={searchOption.sheet_name}
              onChange={(e) => handleSearchOption(e)}
            />
            <TextField
              className={classes.searchItem}
              label='点検グループ'
              variant='outlined'
              size='small'
              name='inspection_group'
              value={searchOption.inspection_group}
              onChange={(e) => handleSearchOption(e)}
            />
            <TextField
              className={classes.searchItem}
              label='点検種別'
              variant='outlined'
              size='small'
              name='inspection_type'
              value={searchOption.inspection_type}
              onChange={(e) => handleSearchOption(e)}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
            <IconButton edge='end' onClick={handleResetSearchOption}>
              <RotateLeftIcon />
            </IconButton>
          </Container>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ダウンロード</TableCell>
                  <TableCell>点検シート名</TableCell>
                  <TableCell>点検グループ</TableCell>
                  <TableCell>点検種別</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInspectionSheets
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((sheet: InspectionSheet) =>
                    <TableRow key={sheet.sheet_id}>
                      <TableCell padding='checkbox'>
                        <ButtonGroup color="primary" aria-label="outlined primary button group">
                          <Button onClick={() => handleDownload(sheet)}>Excel</Button>
                          <Button onClick={() => handleExportJson(sheet)}>JSON</Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>{sheet.sheet_name}</TableCell>
                      <TableCell>
                        {groups.find(x => x.inspection_group_id === sheet.inspection_group_id)?.description}
                      </TableCell>
                      <TableCell>
                        {types.find(x => x.inspection_type_id === sheet.inspection_type_id)?.description}
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <Link to={'/edit/' + sheet.sheet_id}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <Link to={'/details/' + sheet.sheet_id}>
                          <DetailsIcon />
                        </Link>
                      </TableCell>
                      <TableCell padding='checkbox'>
                        <IconButton
                          size='small'
                          color='secondary'
                          onClick={() => handleClickOpen(sheet)}
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
            component='div'
            count={inspectionSheets.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={'1ページあたりの件数:'}
            backIconButtonText={'前のぺージ'}
            nextIconButtonText={'次のぺージ'}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
      <Dialog
        open={open}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'点検シートを削除しますか?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <p>次の点検シートを削除します。（この操作は取り消せません）</p>
            <p>シート名：{targetSheet.sheet_name}</p>
            <p>点検グループ：{groups.find(x => x.inspection_group_id === targetSheet.inspection_group_id)?.description}</p>
            <p>点検種別：{types.find(x => x.inspection_type_id === targetSheet.inspection_type_id)?.description}</p>
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
