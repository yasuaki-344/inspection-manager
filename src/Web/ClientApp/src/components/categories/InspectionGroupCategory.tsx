import React, { FC, useState, useEffect } from 'react';
import {
  Grid, Paper, TextField, Button,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  TableContainer
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { InspectionGroup } from '../../typescript-fetch';
import { InspectionGroupInteractor } from '../../use-cases';
import { InspectionGroupController } from '../../controllers';
import { InspectionGroupPresenter } from '../../presenters';
import { InspectionGroupRepository } from '../../infrastructure/InspectionGroupRepository';
import { ProcessResult } from './ProcessResult';
import { TopPageLink } from '../common';

const generate = (hook: [Array<InspectionGroup>, React.Dispatch<React.SetStateAction<Array<InspectionGroup>>>]) => {
  const [types, setTypes] = hook;
  const useCase = new InspectionGroupInteractor(types, setTypes, new InspectionGroupRepository());
  const controller = new InspectionGroupController(useCase);
  const presenter = new InspectionGroupPresenter(useCase);
  return { controller, presenter }
}

export const InspectionGroupCategory: FC = (): JSX.Element => {
  const { controller, presenter } = generate(useState<Array<InspectionGroup>>([]));

  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionGroup>({
    inspection_group_id: 0,
    description: ''
  });
  const [processResult, setProcessResult] = useState({
    severity: 'success',
    message: '',
    isVisible: false,
  });

  // eslint-disable-next-line
  useEffect(() => { presenter.get() }, []);

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
    const group = presenter.getById(id);
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
          setProcessResult({
            severity: 'success',
            message: '更新に成功しました',
            isVisible: true,
          });
        })
        .catch(error => {
          console.error(error);
          setProcessResult({
            severity: 'error',
            message: '更新に失敗しました',
            isVisible: true,
          });
        });
    } else {
      controller.create(target)
        .then(() => {
          setProcessResult({
            severity: 'success',
            message: '追加に成功しました',
            isVisible: true,
          });
        })
        .catch(error => {
          console.error(error);
          setProcessResult({
            severity: 'error',
            message: '追加に失敗しました',
            isVisible: true,
          });
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
        setProcessResult({
          severity: 'success',
          message: '削除に成功しました',
          isVisible: true,
        });
      })
      .catch(error => {
        console.error(error);
        setProcessResult({
          severity: 'error',
          message: '削除に失敗しました',
          isVisible: true,
        });
      });
  }

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h1>点検グループ編集</h1>
        </Grid>
        <Grid item xs={12}>
          <TopPageLink />
        </Grid>
        <Grid item xs={12}>
          <ProcessResult
            message={processResult.message}
            severity={processResult.severity}
            isVisible={processResult.isVisible}
            close={() => setProcessResult({
              severity: 'success',
              message: '',
              isVisible: false,
            })}
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            {presenter.inspectionGroupTable(handleUpdateItem, handleDeleteItem)}
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
