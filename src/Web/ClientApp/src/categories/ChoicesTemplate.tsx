import React, { useState } from "react";
import {
  BottomNavigation, BottomNavigationAction, IconButton,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper,

} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

export const ChoicesTemplate = (): JSX.Element => {
  const [open, setOpen] = useState(false);
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
