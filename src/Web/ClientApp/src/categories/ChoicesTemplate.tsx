import React from "react";
import {
  BottomNavigation, BottomNavigationAction, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Grid, Paper,

} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';

export const ChoicesTemplate = (): JSX.Element => {
  const templates = [
    ['hoge', 'foo', 'var']
  ];

  /**
   * Add new template set.
   */
  const handleAddTemplate = () => {

  };

  return (
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
  );
}
ChoicesTemplate.displayName = ChoicesTemplate.name;
