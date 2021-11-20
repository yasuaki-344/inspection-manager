import { createContext, useState } from "react";
import { InspectionItemDialogStatus } from "../entities";

export const InspectionItemDialogInitialState: InspectionItemDialogStatus = {
  isOpen: false,
  isAdditional: false,
};

export const InspectionItemDialogStateContext = createContext(
  useState(InspectionItemDialogInitialState)
);
