import React, { FC, useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InspectionItemForm } from "./InspectionItemForm";
import { BottomNavigationAdd, CancelIconButton } from "../utilities";
import { equipmentLabel, MenuIcon, paperElement } from "../stylesheets";
import { ItemType, Equipment } from "../../entities";
import { IInspectionSheetController } from "../../interfaces";
import {
  InspectionItemDialogStateContext,
  useDIContext,
} from "../../container";

interface DragItem {
  orderIndex: number;
}

interface EquipmentFormProps {
  orderIndex: number;
  equipment: Equipment;
}

export const EquipmentForm: FC<EquipmentFormProps> = (
  props: EquipmentFormProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  const [status, setStatus] = useContext(InspectionItemDialogStateContext);

  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: DragItem) {
      if (!dropRef.current || item.orderIndex === props.orderIndex) {
        return;
      }
      controller.swapEquipments(props.orderIndex, item.orderIndex);
    },
  });
  const [, drag, preview] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { orderIndex: props.orderIndex },
  });
  preview(drop(dropRef));
  drag(dragRef);

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddInspectionItem = (orderIndex: number) => {
    controller.setUp();
    setStatus({
      ...status,
      isOpen: true,
      isAdditional: true,
      equipmentOrderIndex: orderIndex,
    });
  };

  return (
    <Paper variant="outlined">
      <Accordion>
        <AccordionSummary
          sx={equipmentLabel}
          expandIcon={<ExpandMoreIcon sx={MenuIcon} />}
          ref={dropRef}
        >
          <IconButton size="small" color="inherit" ref={dragRef}>
            <DragHandleIcon />
          </IconButton>
          <div>{props.equipment.equipmentName}</div>
          <CancelIconButton
            onClick={() => controller.removeEquipment(props.orderIndex)}
          />
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12} sx={paperElement}>
              <TextField
                required
                label="点検機器名"
                variant="outlined"
                size="small"
                name="equipmentName"
                value={props.equipment.equipmentName}
                onChange={(e) =>
                  controller.changeEquipmentName(e, props.orderIndex)
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InspectionItemForm
                equipmentIndex={props.orderIndex}
                inspectionItems={props.equipment.inspectionItems}
              />
              <BottomNavigationAdd
                label="点検項目追加"
                onClick={() => handleAddInspectionItem(props.orderIndex)}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
