import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Collapse,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import nameof from "ts-nameof.macro";
import { useInputTypes, Equipment, InspectionItem } from "../../entities";
import { TopPageLink } from "../utilities";
import { itemTableHead, TableHeadCell } from "../stylesheets";
import { IDetailController, IDetailPresenter } from "../../interfaces";
import { useDIContext } from "../../container";

interface InspectionItemTableProps {
  inspectionItems: InspectionItem[];
}

interface EquipmentRowProps {
  equipment: Equipment;
}

const InspectionItemTable = (props: InspectionItemTableProps): JSX.Element => {
  return (
    <Table>
      <TableHead sx={itemTableHead}>
        <TableRow>
          <TableCell sx={TableHeadCell}>ID</TableCell>
          <TableCell sx={TableHeadCell}>点検項目</TableCell>
          <TableCell sx={TableHeadCell}>点検タイプ</TableCell>
          <TableCell sx={TableHeadCell}>選択肢</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.inspectionItems.map((item: InspectionItem) => (
          <TableRow key={item.inspectionItemId}>
            <TableCell>{item.inspectionItemId}</TableCell>
            <TableCell>{item.inspectionContent}</TableCell>
            <TableCell>
              {useInputTypes.filter((e) => e.value === item.inputType)[0].label}
            </TableCell>
            <TableCell>
              {item.choices.map((x) => x.description).join(",")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const EquipmentRow = (props: EquipmentRowProps): JSX.Element => {
  const [open, setOpen] = useState(true);

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
              <InspectionItemTable
                inspectionItems={props.equipment.inspectionItems}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export const Details = ({ match }: any): JSX.Element => {
  const sheetId = match.params.id;
  const inject = useDIContext();
  const presenter: IDetailPresenter = inject(nameof<IDetailPresenter>());
  const controller: IDetailController = inject(nameof<IDetailController>());

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    controller.fetchDisplayData(sheetId).then(() => setLoading(false));
  }, [sheetId]);

  const displayData = loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : (
    <>
      <List>
        <ListItem>点検シートID:{sheetId}</ListItem>
        <ListItem>シート名:{presenter.sheetName}</ListItem>
        <ListItem>点検グループ:{presenter.getInspectionGroup()}</ListItem>
        <ListItem>点検種別:{presenter.getInspectionType()}</ListItem>
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
            {presenter.equipments.map((equipment: Equipment) => (
              <EquipmentRow key={equipment.equipmentId} equipment={equipment} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
  return (
    <div>
      <h1>詳細ページ</h1>
      <TopPageLink />
      {displayData}
    </div>
  );
};
Details.displayName = Details.name;
