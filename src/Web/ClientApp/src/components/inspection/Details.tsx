import React, { FC, Fragment, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Paper,
  List,
  ListItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  useInputTypes,
  InspectionSheet,
  Equipment,
  InspectionItem,
  InspectionSheetInitialState,
  InspectionGroup,
  InspectionType,
  toCamelCase,
} from "../../entities";
import { TopPageLink } from "../common";
import { itemTableHead, TableHeadCell } from "../stylesheets";

interface RowProps {
  equipment: Equipment;
}

const Row: FC<RowProps> = (props: RowProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment key={props.equipment.equipmentId}>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{props.equipment.equipmentId}</TableCell>
        <TableCell>{props.equipment.equipmentName}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableHead sx={itemTableHead}>
                  <TableCell sx={TableHeadCell}>ID</TableCell>
                  <TableCell sx={TableHeadCell}>点検項目</TableCell>
                  <TableCell sx={TableHeadCell}>点検タイプ</TableCell>
                  <TableCell sx={TableHeadCell}>選択肢</TableCell>
                </TableHead>
                <TableBody>
                  {props.equipment.inspectionItems.map(
                    (item: InspectionItem) => (
                      <TableRow key={item.inspectionItemId}>
                        <TableCell>{item.inspectionItemId}</TableCell>
                        <TableCell>{item.inspectionContent}</TableCell>
                        <TableCell>
                          {
                            useInputTypes.filter(
                              (e) => e.value === item.inputType
                            )[0].label
                          }
                        </TableCell>
                        <TableCell>
                          {item.choices.map((x) => x.description).join(",")}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export const Details = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const [inspectionSheet, setInspectionSheet] = useState<InspectionSheet>(
    InspectionSheetInitialState
  );
  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);

  useEffect(() => {
    fetch("inspectiongroup")
      .then((res) => res.json())
      .then((json: InspectionGroup[]) => {
        setGroups(json);
      })
      .catch(console.error);

    fetch("inspectiontype")
      .then((res) => res.json())
      .then((json: InspectionType[]) => {
        setTypes(json);
      })
      .catch(console.error);

    fetch(`inspectionsheet/${sheetId}`)
      .then((res) => res.json())
      .then((json) => {
        const data = toCamelCase(json)
        console.log(JSON.stringify(data));
        setInspectionSheet(data);
      })
      .catch(console.error);
  }, [sheetId]);

  return (
    <div>
      <h1>詳細ページ</h1>
      <TopPageLink />
      <List>
        <ListItem>点検シートID:{inspectionSheet.sheetId}</ListItem>
        <ListItem>シート名:{inspectionSheet.sheetName}</ListItem>
        <ListItem>
          点検グループ:
          {
            groups.find(
              (x) => x.inspectionGroupId === inspectionSheet.inspectionGroupId
            )?.description
          }
        </ListItem>
        <ListItem>
          点検種別:
          {
            types.find(
              (x) => x.inspectionTypeId === inspectionSheet.inspectionTypeId
            )?.description
          }
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
            {inspectionSheet.equipments.map((equipment: Equipment) => (
              <Row key={equipment.equipmentId} equipment={equipment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
Details.displayName = Details.name;
