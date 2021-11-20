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
import { InspectionItem } from "../../entities";
import { InspectionItemRow } from "./InspectionItemRow";

interface InspectionItemFormProps {
  equipmentIndex: number;
  inspectionItems: InspectionItem[];
  editInspectionItem: (
    equipmentIndex: number,
    inspectionItemIndex: number,
    inspectionItem: InspectionItem
  ) => void;
  // storeHistory: () => void;
}

export const InspectionItemForm: FC<InspectionItemFormProps> = ({
  equipmentIndex,
  inspectionItems,
  editInspectionItem,
  // storeHistory,
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
              editInspectionItem={editInspectionItem}
              // storeHistory={storeHistory}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
