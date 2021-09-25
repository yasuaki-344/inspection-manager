import React, { FC, Fragment, useContext, useEffect, useState } from "react";
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
import nameof from "ts-nameof.macro";
import { useInputTypes, Equipment, InspectionItem } from "../../entities";
import { TopPageLink } from "../common";
import { itemTableHead, TableHeadCell } from "../stylesheets";
import { DIContainerContext } from "../../App";
import {
  IInspectionGroupPresenter,
  IInspectionSheetPresenter,
  IInspectionTypePresenter,
} from "../../interfaces/presenter";

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
  const container = useContext(DIContainerContext);
  const groupPresenter: IInspectionGroupPresenter = container.inject(
    nameof<IInspectionGroupPresenter>()
  );
  const typePresenter: IInspectionTypePresenter = container.inject(
    nameof<IInspectionTypePresenter>()
  );
  const sheetPresenter: IInspectionSheetPresenter = container.inject(
    nameof<IInspectionSheetPresenter>()
  );

  useEffect(() => {
    groupPresenter.get();
    typePresenter.get();
    sheetPresenter.getInspectionSheetById(sheetId);
  }, [sheetId]);

  return (
    <div>
      <h1>詳細ページ</h1>
      <TopPageLink />
      <List>
        <ListItem>点検シートID:{sheetPresenter.getState().sheetId}</ListItem>
        <ListItem>シート名:{sheetPresenter.getState().sheetName}</ListItem>
        <ListItem>
          点検グループ:
          {groupPresenter.getGroupName(
            sheetPresenter.getState().inspectionGroupId
          )}
        </ListItem>
        <ListItem>
          点検種別:
          {typePresenter.getTypeName(
            sheetPresenter.getState().inspectionTypeId
          )}
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
            {sheetPresenter
              .getState()
              .equipments.map((equipment: Equipment) => (
                <Row key={equipment.equipmentId} equipment={equipment} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
Details.displayName = Details.name;
