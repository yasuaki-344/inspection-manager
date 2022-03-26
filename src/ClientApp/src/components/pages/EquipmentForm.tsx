import React, { FC, useContext, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import nameof from "ts-nameof.macro";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InspectionItemForm } from "./InspectionItemForm";
import { BottomNavigationAdd, CancelIconButton } from "../utilities";
import { equipmentLabel, MenuIcon, paperElement } from "../stylesheets";
import { ItemType, Equipment } from "../../entities";
import {
  InspectionItemDialogStateContext,
  useDIContext,
} from "../../container";
import {
  IInspectionItemInteractor,
  IInspectionSheetInteractor,
} from "../../interfaces";

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
  const sheetUseCase: IInspectionSheetInteractor = inject(
    nameof<IInspectionSheetInteractor>()
  );
  const itemUseCase: IInspectionItemInteractor = inject(
    nameof<IInspectionItemInteractor>()
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
      sheetUseCase.swapEquipments(props.orderIndex, item.orderIndex);
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
    itemUseCase.setItem({
      inspectionItemId: 0,
      orderIndex: 0,
      inspectionContent: "",
      inputType: 1,
      choices: [],
    });
    setStatus({
      ...status,
      isOpen: true,
      isAdditional: true,
      equipmentOrderIndex: orderIndex,
    });
  };

  return (
    <Accordion>
      <AccordionSummary
        sx={equipmentLabel}
        expandIcon={<ExpandMoreIcon sx={MenuIcon} />}
        ref={dropRef}
      >
        <IconButton size="small" color="inherit" ref={dragRef}>
          <DragHandleIcon />
        </IconButton>
        <Box>{props.equipment.equipmentName}</Box>
        <CancelIconButton
          onClick={() => sheetUseCase.removeEquipment(props.orderIndex)}
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
              onChange={(e) => {
                const name = e.target.value;
                sheetUseCase.setEquipmentName(props.orderIndex, name);
              }}
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
  );
};
