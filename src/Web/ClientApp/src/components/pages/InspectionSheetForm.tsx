import React, { FC, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import nameof from "ts-nameof.macro";
import { InspectionItemDialog } from "../dialog";
import {
  IInspectionSheetPresenter,
  IInspectionSheetController,
} from "../../interfaces";
import {
  InspectionItemDialogStateContext,
  useDIContext,
} from "../../container";
import { InputStyle, LabelStyle } from "../stylesheets";
import { Equipment, InspectionGroup, InspectionType } from "../../entities";
import { EquipmentForm } from ".";

interface InspectionSheetFormProps {
  isEdit: boolean;
}

export const InspectionSheetForm: FC<InspectionSheetFormProps> = (
  props: InspectionSheetFormProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  const presenter: IInspectionSheetPresenter = inject(
    nameof<IInspectionSheetPresenter>()
  );
  const [status, setStatus] = useContext(InspectionItemDialogStateContext);

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (status.isAdditional) {
      controller.addInspectionItem(status.equipmentOrderIndex);
    } else {
      controller.updateInspectionItem(
        status.equipmentOrderIndex,
        status.itemOrderIndex
      );
    }
    setStatus({ ...status, isOpen: false });
  };

  const sheetInformation = props.isEdit ? (
    <Grid item xs={12}>
      <TextField
        sx={InputStyle}
        disabled
        label="点検シートID"
        variant="outlined"
        size="small"
        name="sheetId"
        defaultValue={presenter.sheetId}
        InputProps={{ readOnly: true }}
      />
    </Grid>
  ) : (
    <></>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper variant="outlined">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={LabelStyle}>点検シート情報</Box>
          </Grid>
          {sheetInformation}
          <Grid item xs={12}>
            <TextField
              sx={InputStyle}
              required
              autoFocus
              label="点検シート名"
              variant="outlined"
              size="small"
              name="sheetName"
              value={presenter.sheetName}
              onChange={controller.changeSheetName}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={InputStyle}
              select
              label="点検グループ"
              variant="outlined"
              size="small"
              name="inspectionGroupId"
              value={presenter.groupId}
              onChange={controller.changeGroupId}
            >
              {presenter.groups.map((group: InspectionGroup) => (
                <MenuItem
                  key={group.inspectionGroupId}
                  value={group.inspectionGroupId}
                >
                  {group.description}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              sx={InputStyle}
              select
              label="点検タイプ"
              variant="outlined"
              size="small"
              name="inspectionTypeId"
              value={presenter.typeId}
              onChange={controller.changeTypeId}
            >
              {presenter.types.map((type: InspectionType) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.description}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid container spacing={1} sx={{ pt: 1.5 }}>
            {presenter.equipments.map((equipment: Equipment) => (
              <Grid item xs={12} key={equipment.orderIndex}>
                <EquipmentForm
                  orderIndex={equipment.orderIndex}
                  equipment={equipment}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                label="点検機器追加"
                icon={<AddCircleIcon />}
                onClick={() => controller.addEquipment()}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Paper>
      <InspectionItemDialog
        open={status.isOpen}
        onCancelButtonClick={() => setStatus({ ...status, isOpen: false })}
        onOkButtonClick={handleInspectionItem}
      />
    </DndProvider>
  );
};
InspectionSheetForm.displayName = InspectionSheetForm.name;
