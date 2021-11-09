import React, { FC, Fragment, useEffect, useState } from "react";
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
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import nameof from "ts-nameof.macro";
import { useInputTypes, Equipment, InspectionItem } from "../../entities";
import { TopPageLink } from "../utilities";
import { itemTableHead, TableHeadCell } from "../stylesheets";
import { IDetailController, IDetailPresenter } from "../../interfaces";
import { useDIContext } from "../../container";

interface RowProps {
  equipment: Equipment;
}

const Row: FC<RowProps> = (props: RowProps): JSX.Element => {
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

export const Details: FC = ({ match }: any): JSX.Element => {
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
      {presenter.sheetInformationList()}
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
            {presenter.equipments().map((equipment: Equipment) => (
              <Row key={equipment.equipmentId} equipment={equipment} />
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
