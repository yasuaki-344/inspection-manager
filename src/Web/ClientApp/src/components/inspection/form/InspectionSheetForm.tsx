import React, { FC, useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  BottomNavigation,
  BottomNavigationAction,
  Grid,
  Paper,
} from "@mui/material";
import UndoIcon from "@mui/icons-material/Undo";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import nameof from "ts-nameof.macro";
import { InspectionItemDialog } from "../dialog/InspectionItemDialog";
import { DIContainerContext } from "../../../App";
import {
  InspectionItem,
  InspectionSheet,
  InspectionGroup,
  InspectionType,
} from "../../../entities";
import {
  InspectionGroupRepository,
  InspectionTypeRepository,
} from "../../../infrastructure";
import {
  IInspectionItemController,
  IInspectionItemPresenter,
  IInspectionSheetPresenter,
  IInspectionSheetController
} from "../../../interfaces";

interface InspectionSheetFormProps {
  isEdit: boolean;
}

export const InspectionSheetForm: FC<InspectionSheetFormProps> = (
  props: InspectionSheetFormProps
): JSX.Element => {
  const { inject } = useContext(DIContainerContext);

  const sheetPresenter: IInspectionSheetPresenter = inject(
    nameof<IInspectionSheetPresenter>()
  );
  const sheetController: IInspectionSheetController = inject(
    nameof<IInspectionSheetController>()
  );
  const itemPresenter: IInspectionItemPresenter = inject(
    nameof<IInspectionItemPresenter>()
  );
  const itemController: IInspectionItemController = inject(
    nameof<IInspectionItemController>()
  );

  const [groups, setGroups] = useState<InspectionGroup[]>([]);
  const [types, setTypes] = useState<InspectionType[]>([]);
  const [open, setOpen] = useState(false);
  const [undoDisabled, setUndoDisabled] = useState(true);
  const [additional, setAdditional] = useState(false);
  const [equipmentIndex, setEquipmentIndex] = useState(0);
  const [inspectionItemIndex, setInspectionItemIndex] = useState(0);
  const [history, setHistory] = useState<InspectionSheet[]>([]);

  useEffect(() => {
    const groupApi = new InspectionGroupRepository();
    groupApi
      .get()
      .then((res) => setGroups(res))
      .catch(console.error);
    const typeApi = new InspectionTypeRepository();
    typeApi
      .get()
      .then((res) => setTypes(res))
      .catch(console.error);
  }, []);

  const storeHistory = () => {
    setHistory(history.concat(sheetPresenter.getState()));
    setUndoDisabled(false);
  };

  const getHistory = () => {
    const sheet = history.pop();
    if (sheet != null) {
      sheetController.setSheet(sheet);
      setUndoDisabled(!history.length);
    }
  };

  /**
   * Implements the process for managing inspection item of equipment.
   */
  const handleInspectionItem = () => {
    if (additional) {
      sheetController.addInspectionItem(
        equipmentIndex,
        itemPresenter.getState()
      );
    } else {
      sheetController.updateInspectionItem(
        equipmentIndex,
        inspectionItemIndex,
        itemPresenter.getState()
      );
    }
    storeHistory();
    setOpen(false);
  };

  /**
   * Implements the process for adding inspection item.
   */
  const handleAddItem = (equipmentId: number) => {
    setEquipmentIndex(equipmentId);
    setAdditional(true);
    itemController.initialize();
    setOpen(true);
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
    setAdditional(false);
    itemController.setItem(inspectionItem);
    setOpen(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper variant="outlined">
        {sheetPresenter.getEditContent(
          props.isEdit,
          groups,
          types,
          handleAddItem,
          handleEditItem
          // storeHistory
        )}
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
                onClick={() => sheetController.addEquipment()}
              />
            </BottomNavigation>
          </Grid>
        </Grid>
      </Paper>
      <InspectionItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        handleInspectionItem={handleInspectionItem}
      />
    </DndProvider>
  );
};
InspectionSheetForm.displayName = InspectionSheetForm.name;
