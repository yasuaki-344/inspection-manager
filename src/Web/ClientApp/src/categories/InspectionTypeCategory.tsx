import React, { FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  IconButton, Grid, Paper, TextField, Button,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionType } from './../typescript-fetch/models/InspectionType';
import { InspectionTypesApi } from './../typescript-fetch/apis/InspectionTypesApi';

const api = new InspectionTypesApi();

export const InspectionTypeCategory: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionType>({
    inspection_type_id: 0,
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    api.inspectionTypesGet()
      .then(res => setTypes(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setDisabled(!target.description.length);
  }, [target]);

  /**
   * Implement the process to add new type
   */
  const handleAddItem = (): void => {
    setTarget({
      inspection_type_id: 0,
      description: 'タイプ'
    });
    setIsUpdate(false);
    setOpen(true);
  }

  /**
   * Implement the process to update type
   * @param id Type ID to be edited.
   */
  const handleUpdateItem = (id: number): void => {
    const type = types.find(x => x.inspection_type_id === id);
    if (type != null) {
      setTarget(type);
      setIsUpdate(true);
      setOpen(true);
    }
  }

  const handleRegistration = (): void => {
    if (isUpdate) {
      api.inspectionTypesInspectionTypeIdPut({
        inspectionTypeId: target.inspection_type_id,
        inspectionType: target
      })
        .then(res => {
          setTypes(types.map(x => {
            if (x.inspection_type_id === res.inspection_type_id) {
              return res;
            } else {
              return x;
            }
          }));
          setSuccessMessage('更新に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.log(error);
          setSuccessMessage('');
          setErrorMessage('更新に失敗しました');
        });
    } else {
      api.inspectionTypesPost({
        'inspectionType': target
      })
        .then(res => {
          setTypes(types.concat(res));
          setSuccessMessage('追加に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.error(error);
          setSuccessMessage('');
          setErrorMessage('追加に失敗しました');
        })
    }
    setOpen(false);
  }

  /**
   * Implement the process to delete group
   * @param id Type ID to be deleted.
   */
  const handleDeleteItem = (id: number): void => {
    api.inspectionTypesInspectionTypeIdDelete({
      'inspectionTypeId': id
    })
      .then(() => {
        setTypes(types.filter((x: InspectionType) =>
          x.inspection_type_id !== id));
        setSuccessMessage('削除に成功しました');
        setErrorMessage('');
      })
      .catch(error => {
        console.error(error);
        setSuccessMessage('');
        setErrorMessage('削除に失敗しました');
      });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>点検タイプ編集</h1>
        </Grid>
        <Grid item xs={12}>
          <Link to='/'>トップページへ戻る</Link>
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
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>点検タイプ</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {types.map((type: InspectionType, index: number) =>
                      <TableRow key={type.inspection_type_id}>
                        <TableCell>
                          {type.description}
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => handleUpdateItem(type.inspection_type_id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            data-testid={`remove-type-button-${index}`}
                            size="small"
                            color='secondary'
                            onClick={() => handleDeleteItem(type.inspection_type_id)}
                          >
                            <CancelIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  data-testid='add-type-button'
                  label="点検タイプ追加"
                  icon={<AddCircleIcon />}
                  onClick={handleAddItem}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>点検タイプ編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                label='点検タイプ名'
                variant='outlined'
                size='small'
                name='description'
                value={target.description}
                onChange={(e) => setTarget({
                  ...target,
                  [e.target.name]: e.target.value,
                })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            onClick={() => handleRegistration()}
          >OK</Button>
          <Button
            variant='contained'
            onClick={() => setOpen(false)}
          >キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
InspectionTypeCategory.displayName = InspectionTypeCategory.name;
