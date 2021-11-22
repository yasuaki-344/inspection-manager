import React, { FC, useContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import nameof from "ts-nameof.macro";
import { InspectionItemDialog } from "../dialog";
import { ICreatePresenter, ICreateController } from "../../interfaces";
import {
  InspectionItemDialogStateContext,
  useDIContext,
} from "../../container";
import { LabelStyle } from "../stylesheets";

interface InspectionSheetFormProps {
  isEdit: boolean;
}

export const InspectionSheetForm: FC<InspectionSheetFormProps> = (
  props: InspectionSheetFormProps
): JSX.Element => {
  const inject = useDIContext();
  const controller: ICreateController = inject(nameof<ICreateController>());
  const presenter: ICreatePresenter = inject(nameof<ICreatePresenter>());
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

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper variant="outlined">
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box sx={LabelStyle}>点検シート情報</Box>
          </Grid>
          {presenter.sheetIdInformation(props.isEdit)}
          {presenter.sheetNameInput(controller.changeSheetName)}
          {presenter.groupIdInput(controller.changeGroupId)}
          {presenter.typeIdInput(controller.changeTypeId)}
          {presenter.getEditContent()}
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
