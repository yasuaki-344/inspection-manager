import React, { FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Grid, Paper, TextField, Button,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TableContainer,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { InspectionType } from '../../typescript-fetch';
import { InspectionTypeInteractor } from "../../use-cases";
import { InspectionTypeController } from "../../controllers";
import { InspectionTypePresenter } from "../../presenters";

const generate = (hook: [InspectionType[], React.Dispatch<React.SetStateAction<InspectionType[]>>]) => {
  const [types, setTypes] = hook;
  const useCase = new InspectionTypeInteractor(types, setTypes);
  const controller = new InspectionTypeController(useCase);
  const presenter = new InspectionTypePresenter(useCase);
  return { controller, presenter }
}

export const InspectionTypeCategory: FC = (): JSX.Element => {
  const { controller, presenter } = generate(useState<InspectionType[]>([]));

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionType>({
    inspection_type_id: 0,
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // eslint-disable-next-line
  useEffect(() => { presenter.get() }, []);

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
    const type = presenter.getById(id);
    if (type != null) {
      setTarget(type);
      setIsUpdate(true);
      setOpen(true);
    }
  }

  const handleRegistration = (): void => {
    if (isUpdate) {
      controller.update(target)
        .then(() => {
          setSuccessMessage('更新に成功しました');
          setErrorMessage('');
        })
        .catch(error => {
          console.log(error);
          setSuccessMessage('');
          setErrorMessage('更新に失敗しました');
        });
    } else {
      controller.create(target)
        .then(() => {
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
    controller.delete(id)
      .then(() => {
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
                {presenter.inspectionTypeTable(handleUpdateItem, handleDeleteItem)}
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
