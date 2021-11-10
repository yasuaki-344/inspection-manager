import React from "react";
import { InspectionType } from "../../entities";

export interface IInspectionTypeController {
  fetchInspectionTypes(): Promise<void>;
  createEditItem(): void;
  setEditItem(id: number): void;
  editType(e: React.ChangeEvent<HTMLInputElement>): void;
  create(inspectionType: InspectionType): Promise<void>;
  update(inspectionType: InspectionType): Promise<void>;
  delete(id: number): Promise<void>;
}
