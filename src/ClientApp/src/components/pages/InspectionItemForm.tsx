import React, { FC } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { InspectionItem } from "../../typescript-fetch";
import { InspectionItemRow } from "./InspectionItemRow";

interface InspectionItemFormProps {
  equipmentIndex: number;
  inspectionItems: InspectionItem[];
}

export const InspectionItemForm: FC<InspectionItemFormProps> = ({
  equipmentIndex,
  inspectionItems,
}): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell>点検項目</TableCell>
            <TableCell>点検タイプ</TableCell>
            <TableCell>選択肢</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {inspectionItems.map((item: InspectionItem) => (
            <InspectionItemRow
              key={item.orderIndex}
              equipmentIndex={equipmentIndex}
              inspectionItemIndex={item.orderIndex}
              inspectionItem={item}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
