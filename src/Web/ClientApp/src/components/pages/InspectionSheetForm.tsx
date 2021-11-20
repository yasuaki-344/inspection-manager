import React, { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import UndoIcon from "@mui/icons-material/Undo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import nameof from "ts-nameof.macro";
import { InspectionItemDialog } from "../dialog";
import { InspectionItem } from "../../entities";
import {
  IInspectionItemController,
  IInspectionItemPresenter,
  ICreatePresenter,
  ICreateController,
} from "../../interfaces";
import { useDIContext } from "../../container";
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

  const itemPresenter: IInspectionItemPresenter = inject(
    nameof<IInspectionItemPresenter>()
  );
  const itemController: IInspectionItemController = inject(
    nameof<IInspectionItemController>()
  );

  const [undoDisabled, setUndoDisabled] = useState(true);
  const [status, setStatus] = useState({ isOpen: false, isAdditional: false });
  /* eslint-disable-next-line */
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [inspectionItemIndex, setInspectionItemIndex] = useState(0);
  // const [history, setHistory] = useState<InspectionSheet[]>([]);

  const storeHistory = () => {
    // setHistory(history.concat(sheetPresenter.state));
    setUndoDisabled(false);
  };

  const getHistory = () => {
    // const sheet = history.pop();
    // if (sheet != null) {
    //   sheetController.setSheet(sheet);
    //   setUndoDisabled(!history.length);
    // }
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (status.isAdditional) {
      controller.addInspectionItem(equipmentIndex, itemPresenter.state);
    } else {
      controller.updateInspectionItem(
        equipmentIndex,
        inspectionItemIndex,
        itemPresenter.state
      );
    }
    storeHistory();
    setStatus({ ...status, isOpen: false });
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: number) => {
    setEquipmentIndex(equipmentId);
    itemController.initialize();
    setStatus({ isOpen: true, isAdditional: true });
  };

  /**
   * Implements the process for editing inspection item.
   */
  const handleEditItem = (
    equipIndex: number,
    itemIndex: number,
    inspectionItem: InspectionItem
  ) => {
    setEquipmentIndex(equipIndex);
    setInspectionItemIndex(itemIndex);
    itemController.setItem(inspectionItem);
    setStatus({ isOpen: true, isAdditional: false });
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
          {presenter.getEditContent(
            handleAddItem,
            handleEditItem
            // storeHistory
          )}
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <BottomNavigation showLabels>
              <BottomNavigationAction
                disabled={undoDisabled}
                label="戻る"
                icon={<UndoIcon />}
                onClick={getHistory}
              />
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
