import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton, Grid, Paper, TextField, Button,
  BottomNavigation, BottomNavigationAction,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import { InspectionGroup } from './../inspection/Types';

export const InspectionGroupCategory: FC = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [target, setTarget] = useState<InspectionGroup>({
    inspection_group_id: 0,
    description: ''
  });

  useEffect(() => {
    fetch('inspectiongroup')
      .then(res => res.json())
      .then((json: InspectionGroup[]) => setGroups(json))
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
      fetch(`inspectiongroup/${target.inspection_group_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(target)
      })
        .then((res) => {
          if (!res.ok) {
            alert('更新に失敗しました')
          }
          return res.json();
        })
        .then((json: InspectionGroup) => {
          setGroups(groups.map(x => {
            if (x.inspection_group_id === json.inspection_group_id) {
              return json;
            } else {
              return x;
            }
          }));
        })
        .catch(console.error);
    } else {
      fetch('inspectiongroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(target)
      })
        .then((res) => {
          if (!res.ok) {
            alert('登録に失敗しました')
          }
          return res.json();
        })
        .then((json: InspectionGroup) => {
          setGroups(groups.concat(json));
        })
        .catch(console.error);
    }
    setOpen(false);
  }

  /**
   * Implement the process to delete group
   * @param id Group ID to be deleted.
   */
  const handleDeleteItem = (id: number): void => {
    fetch(`inspectiongroup/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((json: InspectionGroup) => {
        setGroups(groups.filter((x: InspectionGroup) =>
          x.inspection_group_id !== json.inspection_group_id));
      })
      .catch(console.error);
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
