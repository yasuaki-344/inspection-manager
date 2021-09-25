import React, { FC, useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import EditIcon from "@mui/icons-material/Edit";
import nameof from "ts-nameof.macro";
import { DIContainerContext } from "../../../App";
import { useInputTypes, ItemType, InspectionItem } from "../../../entities";
import { CancelIconButton } from "../../common";
import { IInspectionSheetController } from "../../../interfaces";

interface DragItem {
  equipmentIndex: number;
  inspectionItemIndex: number;
}

interface InspectionItemRowProps {
  equipmentIndex: number;
  inspectionItemIndex: number;
  inspectionItem: InspectionItem;
  editInspectionItem: (
    equipmentIndex: number,
    inspectionItemIndex: number,
    item: InspectionItem
  ) => void;
  // storeHistory: () => void;
}

export const InspectionItemRow: FC<InspectionItemRowProps> = (
  props: InspectionItemRowProps
): JSX.Element => {
  const { inject } = useContext(DIContainerContext);
  const sheetController: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );

  const dropRef = useRef<HTMLTableRowElement>(null);
  const dragRef = useRef<HTMLTableCellElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.INSPECTION_ITEM,
    drop(item: DragItem) {
      if (
        !dropRef.current ||
        item.equipmentIndex !== props.equipmentIndex ||
        item.inspectionItemIndex === props.inspectionItemIndex
      ) {
        return;
      }
      sheetController.swapInspectionItem(
        props.equipmentIndex,
        props.inspectionItemIndex,
        item.inspectionItemIndex
      );
    },
  });

  const [, drag, preview] = useDrag({
    type: ItemType.INSPECTION_ITEM,
    item: {
      equipmentIndex: props.equipmentIndex,
      inspectionItemIndex: props.inspectionItemIndex,
    },
  });

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <TableRow key={props.inspectionItem.inspectionItemId} ref={dropRef}>
      <TableCell padding="checkbox" ref={dragRef}>
        <IconButton size="small">
          <DragHandleIcon />
        </IconButton>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton
          data-testid="edit-item-button"
          size="small"
          onClick={() =>
            props.editInspectionItem(
              props.equipmentIndex,
              props.inspectionItemIndex,
              props.inspectionItem
            )
          }
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {props.inspectionItem.inspectionContent}
      </TableCell>
      <TableCell>
        {
          useInputTypes.filter(
            (e) => e.value === props.inspectionItem.inputType
          )[0].label
        }
      </TableCell>
      <TableCell>
        {props.inspectionItem.choices.map((x) => x.description).join(",")}
      </TableCell>
      <TableCell padding="checkbox">
        <CancelIconButton
          onClick={() =>
            sheetController.removeInspectionItem(
              props.equipmentIndex,
              props.inspectionItemIndex
            )
          }
        />
      </TableCell>
    </TableRow>
  );
};
