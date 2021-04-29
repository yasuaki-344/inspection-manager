import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton, Grid, Paper, TextField, Button,
  BottomNavigation, BottomNavigationAction,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export const InspectionGroupCategory = (): JSX.Element => {
  const [groups, setGroups] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetch('inspectiongroup')
      .then(res => res.json())
      .then((json: string[]) => setGroups(json))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setDisabled(!groups.length || groups.includes(''));
  }, [groups]);

  /**
   * Implement the process to add new group
   */
  const handleAddItem = (): void => setGroups(groups.concat(''));

  /**
   * Implement the process to update group
   */
  const handleUpdateItem = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number): void =>
    setGroups(groups.map((group: string, i: number) =>
      (i === index) ? event.target.value : group
    ));

  /**
   * Implement the process to delete group
   */
  const handleDeleteItem = (index: number): void =>
    setGroups(groups.filter((item: string, i: number) => i !== index));

  /**
   * Implement the process to submit inspection groups
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch('inspectiongroup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(groups)
    })
      .then((res) => {
        if (res.ok) {
          alert('登録に成功しました');
        } else {
          alert('登録に失敗しました')
        }
        return res.json();
      })
      .then((json: string[]) => {
        setGroups(json);
      })
      .catch(console.error);
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>点検グループ編集</h1>
      </Grid>
      <Grid item xs={12}>
        <Link to='/'>トップページへ戻る</Link>
      </Grid>
      <Grid item xs={12}>
        <form data-testid='form' onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>点検グループ</TableCell>
                      <TableCell>&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {groups.map((group: string, index: number) =>
                      <TableRow key={`group_${index}`}>
                        <TableCell>
                          <TextField
                            required
                            variant='outlined'
                            size='small'
                            value={group}
                            onChange={(e) => handleUpdateItem(e, index)}
                          />
                        </TableCell>
                        <TableCell padding='checkbox'>
                          <IconButton
                            data-testid={`remove-group-button-${index}`}
                            size='small'
                            color='secondary'
                            onClick={() => handleDeleteItem(index)}
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
            <Grid item xs={12}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                disabled={disabled}
              >点検グループ登録</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid >
  );
}
InspectionGroupCategory.displayName = InspectionGroupCategory.name;
