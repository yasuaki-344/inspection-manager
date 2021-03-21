import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Collapse, Paper, List, ListItem, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { InspectionSheet, Equipment, InspectionItem } from './Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemTableHead: {
      backgroundColor: theme.palette.primary.main,
    },
    itemTableHeadCell: {
      color: "#FFFFFF",
    },
  })
);

const Row = (props: any): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const equipment = props.equipment;

  return (
    <Fragment key={equipment.equipment_id}>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{equipment.equipment_id}</TableCell>
        <TableCell>{equipment.equipment_name}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableHead className={classes.itemTableHead}>
                  <TableCell className={classes.itemTableHeadCell}>ID</TableCell>
                  <TableCell className={classes.itemTableHeadCell}>点検項目</TableCell>
                  <TableCell className={classes.itemTableHeadCell}>点検タイプ</TableCell>
                  <TableCell className={classes.itemTableHeadCell}>選択肢</TableCell>
                </TableHead>
                <TableBody>
                  {equipment.inspection_items.map((item: InspectionItem) =>
                    <TableRow key={item.inspection_item_id}>
                      <TableCell>{item.inspection_item_id}</TableCell>
                      <TableCell>{item.inspection_content}</TableCell>
                      <TableCell>{item.input_type}</TableCell>
                      <TableCell>{item.choices.join(',')}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

export const Details = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [inspectionSheet, setInspectionSheet] = useState<InspectionSheet>({
    sheet_id: '',
    sheet_name: '',
    equipments: [],
  });

  useEffect(() => {
    fetch(`inspectionsheet/${sheetId}`)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setInspectionSheet(json);
      })
      .catch(console.error);
  }, [sheetId]);

  return (
    <div>
      <h1>詳細ページ</h1>
      <Link to="/">トップページへ戻る</Link>
      <List>
        <ListItem>点検シートID:{inspectionSheet.sheet_id}</ListItem>
        <ListItem>シート名:{inspectionSheet.sheet_name}</ListItem>
      </List>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>点検機器ID</TableCell>
              <TableCell>点検機器名</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inspectionSheet.equipments.map((equipment: Equipment) =>
              <Row key={equipment.equipment_id} equipment={equipment} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
Details.displayName = Details.name;
