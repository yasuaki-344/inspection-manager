import React, { useState } from "react";
import {
  BottomNavigation, BottomNavigationAction, IconButton, Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper, TextField,

} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

export const ChoicesTemplate = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const choices = ['hoge', 'foo', 'var'];
  const templates = [
    ['hoge', 'foo', 'var']
  ];

  /**
   * Add new template set.
   */
  const handleAddTemplate = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <h1>選択肢テンプレート</h1>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>選択肢</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {templates.map((choices: string[], index: number) =>
                  <TableRow key={`template_${index}`}>
                    <TableCell>
                      <IconButton size='small'>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>{choices.join(',')}</TableCell>
                    <TableCell align='right'>
                      <IconButton size='small'>
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
              label="テンプレート追加"
              icon={<AddCircleIcon />}
              onClick={handleAddTemplate}
            />
          </BottomNavigation>
        </Grid>
      </Grid >
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>選択肢テンプレート編集</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            {choices.map((choice: string, index: number) =>
              <Grid item xs={12} key={`choice_${index}`}>
                <TextField
                  required
                  id='outlined-required'
                  label={`選択肢${index + 1}`}
                  variant='outlined'
                  size='small'
                  name='choice'
                  value={choice}
                <IconButton color='primary' size='small'
                >
                  <CancelIcon />
                </IconButton>
              </Grid>
            )}
            <Grid item xs={12}>
              <BottomNavigation showLabels>
                <BottomNavigationAction
                  label='選択肢追加'
                  icon={<AddCircleIcon />}
                />
              </BottomNavigation>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
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
ChoicesTemplate.displayName = ChoicesTemplate.name;
