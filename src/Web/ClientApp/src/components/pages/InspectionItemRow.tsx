import React, { FC, useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { IconButton, TableCell, TableRow } from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import EditIcon from "@mui/icons-material/Edit";
import nameof from "ts-nameof.macro";
import { useInputTypes, ItemType, InspectionItem } from "../../entities";
import { CancelIconButton } from "../utilities";
import { ICreateController } from "../../interfaces";
import {
  InspectionItemDialogStateContext,
  useDIContext,
} from "../../container";

interface DragItem {
  equipmentIndex: number;
  inspectionItemIndex: number;
}

interface InspectionItemRowProps {
  equipmentIndex: number;
  inspectionItemIndex: number;
  inspectionItem: InspectionItem;
}

export const InspectionItemRow: FC<InspectionItemRowProps> = (
  props: InspectionItemRowProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: ICreateController = inject(nameof<ICreateController>());
  const [, setStatus] = useContext(InspectionItemDialogStateContext);

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
      controller.swapInspectionItem(
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

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditInspectionItem = () => {
    controller.setUpItem(props.inspectionItem);
    setStatus({
      isOpen: true,
      isAdditional: false,
      equipmentOrderIndex: props.equipmentIndex,
      itemOrderIndex: props.inspectionItemIndex,
    });
  };

  return (
    <TableRow ref={dropRef}>
      <TableCell padding="checkbox" ref={dragRef}>
        <IconButton size="small">
          <DragHandleIcon />
        </IconButton>
      </TableCell>
      <TableCell padding="checkbox">
        <IconButton
          data-testid="edit-item-button"
          size="small"
          onClick={() => handleEditInspectionItem()}
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
            controller.removeInspectionItem(
              props.equipmentIndex,
              props.inspectionItemIndex
            )
          }
        />
      </TableCell>
    </TableRow>
  );
};
