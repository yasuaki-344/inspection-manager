import React from "react";
import { InspectionGroup } from "../../entities";

export interface IInspectionGroupController {
  fetchInspectionGroups(): Promise<void>;
  createEditItem(): void;
  setEditItem(id: number): void;
  editGroup(e: React.ChangeEvent<HTMLInputElement>): void;

  create(inspectionGroup: InspectionGroup): Promise<void>;
  update(inspectionGroup: InspectionGroup): Promise<void>;
  delete(id: number): Promise<void>;
}
