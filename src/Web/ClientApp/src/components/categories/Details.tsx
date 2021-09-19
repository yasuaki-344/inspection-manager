import React, { FC, Fragment, useEffect, useState } from 'react';
import {
  Box, Collapse, Paper, List, ListItem, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useInputTypes } from '../../entities';
import { InspectionSheet, Equipment, InspectionItem, InspectionSheetInitialState } from '../../entities';
import { InspectionGroup, InspectionType } from '../../typescript-fetch';
import { TopPageLink } from '../common';

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     itemTableHead: {
//       backgroundColor: theme.palette.primary.main,
//     },
//     itemTableHeadCell: {
//       color: "#FFFFFF",
//     },
//   })
// );

interface RowProps {
  equipment: Equipment,
};

const Row: FC<RowProps> = ({ equipment }): JSX.Element => {
  const [open, setOpen] = useState(false);

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
                <TableHead>
                  <TableCell>ID</TableCell>
                  <TableCell>点検項目</TableCell>
                  <TableCell>点検タイプ</TableCell>
                  <TableCell>選択肢</TableCell>
                </TableHead>
                <TableBody>
                  {equipment.inspection_items.map((item: InspectionItem) =>
                    <TableRow key={item.inspection_item_id}>
                      <TableCell>{item.inspection_item_id}</TableCell>
                      <TableCell>{item.inspection_content}</TableCell>
                      <TableCell>
                        {useInputTypes.filter(e => e.value === item.input_type)[0].label}
                      </TableCell>
                      <TableCell>{item.choices.map(x => x.description).join(',')}</TableCell>
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
  const [inspectionSheet, setInspectionSheet] = useState<InspectionSheet>(InspectionSheetInitialState);
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);

  useEffect(() => {
    fetch('inspectiongroup')
      .then(res => res.json())
      .then((json: InspectionGroup[]) => {
        setGroups(json);
      })
      .catch(console.error);

    fetch('inspectiontype')
      .then(res => res.json())
      .then((json: InspectionType[]) => {
        setTypes(json);
      })
      .catch(console.error);

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
      <TopPageLink />
      <List>
        <ListItem>点検シートID:{inspectionSheet.sheet_id}</ListItem>
        <ListItem>シート名:{inspectionSheet.sheet_name}</ListItem>
        <ListItem>
          点検グループ:
          {groups.find(x => x.inspection_group_id === inspectionSheet.inspection_group_id)?.description}
        </ListItem>
        <ListItem>
          点検種別:
          {types.find(x => x.inspection_type_id === inspectionSheet.inspection_type_id)?.description}
        </ListItem>
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