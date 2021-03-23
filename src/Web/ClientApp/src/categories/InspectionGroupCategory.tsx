import React, { useState } from "react";
import { Link } from 'react-router-dom';
import {
  IconButton, Grid, Paper,
  BottomNavigation, BottomNavigationAction,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';

export const InspectionGroupCategory = (): JSX.Element => {
  const [groups, setGroups] = useState<string[]>([
    'group1', 'group2', 'group3']);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <h1>点検グループ編集</h1>
      </Grid>
      <Grid item xs={12}>
        <Link to='/'>トップページへ戻る</Link>
      </Grid>
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
                <TableRow key={`group_{index}`}>
                  <TableCell>{group}</TableCell>
                  <TableCell padding='checkbox'>
                    <IconButton
                      size="small"
                      color='secondary'
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
            label="点検グループ追加"
            icon={<AddCircleIcon />}
          />
        </BottomNavigation>
      </Grid>
    </Grid>
  );
}
InspectionGroupCategory.displayName = InspectionGroupCategory.name;
