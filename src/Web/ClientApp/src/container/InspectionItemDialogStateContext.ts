import { createContext } from "react";
import { InspectionItemDialogStatus } from "../entities";

export const InspectionItemDialogInitialState: InspectionItemDialogStatus = {
  isOpen: false,
  isAdditional: false,
};

export const InspectionItemDialogStateContext = createContext(
  {} as InspectionItemDialogStatus
);
