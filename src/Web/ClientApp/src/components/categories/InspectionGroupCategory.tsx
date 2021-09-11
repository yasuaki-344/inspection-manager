import React, { FC, useState, useEffect } from 'react';
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
import { InspectionGroup, InspectionGroupsApi } from '../../typescript-fetch';
import { InspectionGroupInteractor } from '../../use-cases';
import { InspectionGroupController } from '../../controllers';
import { InspectionGroupPresenter } from '../../presenters';
import { InspectionGroupRepository } from '../../infrastructure/InspectionGroupRepository';

const api = new InspectionGroupsApi();

const generate = (hook: [Array<InspectionGroup>, React.Dispatch<React.SetStateAction<Array<InspectionGroup>>>]) => {
  const [types, setTypes] = hook;
  const useCase = new InspectionGroupInteractor(types, setTypes, new InspectionGroupRepository());
  const controller = new InspectionGroupController(useCase);
  const presenter = new InspectionGroupPresenter(useCase);
  return { controller, presenter }
}

export const InspectionGroupCategory: FC = (): JSX.Element => {
  const hook = useState<Array<InspectionGroup>>([]);
  const { controller, presenter } = generate(hook);

  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<Array<InspectionGroup>>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionGroup>({
    inspection_group_id: 0,
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    api.inspectionGroupsGet()
      .then(res => setGroups(res))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setDisabled(!target.description.length);
  }, [target]);

  /**
   * Implement the process to add new group
   */
  const handleAddItem = (): void => {
    setTarget({
      inspection_group_id: 0,
      description: 'グループ'
    });
    setIsUpdate(false);
    setOpen(true);
  }

  /**
   * Implement the process to update group
   * @param id Group ID to be edited.
   */
  const handleUpdateItem = (id: number): void => {
    const group = groups.find(x => x.inspection_group_id === id);
    if (group != null) {
      setTarget(group);
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
          console.error(error);
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
        });
    }
    setOpen(false);
  }

  /**
   * Implement the process to delete group
   * @param id Group ID to be deleted.
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
          <h1>点検グループ編集</h1>
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
                      <TableCell>点検グループ</TableCell>
                      <TableCell>&nbsp;</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map((group: InspectionGroup, index: number) =>
                      <TableRow key={group.inspection_group_id}>
                        <TableCell>
                          {group.description}
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => handleUpdateItem(group.inspection_group_id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            data-testid={`remove-group-button-${index}`}
                            size='small'
                            color='secondary'
                            onClick={() => handleDeleteItem(group.inspection_group_id)}
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
                  data-testid='add-group-button'
                  label='点検グループ追加'
                  icon={<AddCircleIcon />}
                  onClick={handleAddItem}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>点検グループ編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                required
                label='点検グループ名'
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
InspectionGroupCategory.displayName = InspectionGroupCategory.name;
