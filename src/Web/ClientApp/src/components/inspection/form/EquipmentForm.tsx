import React, { FC, useRef, useContext } from "react";
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
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InspectionItemForm } from "./InspectionItemForm";
import { InspectionSheetContext } from "../../../App";
import { ItemType, Equipment, InspectionItem } from "../../../entities";
import { CancelIconButton } from "../../common";
import { equipmentLabel, MenuIcon, paperElement } from "../../stylesheets";

interface DragItem {
  index: number;
}

interface EquipmentFormProps {
  index: number;
  equipment: Equipment;
  handleAddItem: (equipmentIndex: number) => void;
  handleEditItem: (
    equipmentIndex: number,
    inspectionItemIndex: number,
    inspectionItem: InspectionItem
  ) => void;
  // storeHistory: () => void;
}

export const EquipmentForm: FC<EquipmentFormProps> = (
  props: EquipmentFormProps
): JSX.Element => {
  const { sheetController } = useContext(InspectionSheetContext);
  const dropRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<HTMLButtonElement>(null);

  const [, drop] = useDrop({
    accept: ItemType.EQUIPMENT,
    drop(item: DragItem) {
      if (!dropRef.current || item.index === props.index) {
        return;
      }
      sheetController.swapEquipment(props.index, item.index);
    },
  });
  const [, drag, preview] = useDrag({
    type: ItemType.EQUIPMENT,
    item: { index: props.index },
  });
  preview(drop(dropRef));
  drag(dragRef);

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
          <div>{props.equipment.equipment_name}</div>
          <CancelIconButton
            onClick={() => sheetController.removeEquipment(props.index)}
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
                name="equipment_name"
                value={props.equipment.equipment_name}
                onChange={(e) =>
                  sheetController.updateEquipment(e, props.index)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InspectionItemForm
                equipmentIndex={props.index}
                inspectionItems={props.equipment.inspection_items}
                editInspectionItem={props.handleEditItem}
                addInspectionItem={props.handleAddItem}
                // storeHistory={props.storeHistory}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
