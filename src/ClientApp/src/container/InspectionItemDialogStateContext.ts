import { createContext, Dispatch, SetStateAction } from "react";
import { InspectionItemDialogStatus } from "../entities";

export const InspectionItemDialogInitialState: InspectionItemDialogStatus = {
  isOpen: false,
  isAdditional: false,
  equipmentOrderIndex: 0,
  itemOrderIndex: 0,
};

export const InspectionItemDialogStateContext = createContext(
  {} as [
    InspectionItemDialogStatus,
    Dispatch<SetStateAction<InspectionItemDialogStatus>>
  ]
);
