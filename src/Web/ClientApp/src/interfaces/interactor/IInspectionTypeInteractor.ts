import { InspectionType } from "../../entities";

export interface IInspectionTypeInteractor {
  types: InspectionType[];
  target: InspectionType;

  fetchInspectionTypes(): Promise<void>;
  createEditItem(): void;
  setEditItem(id: number): void;
  editType(name: string, value: string): void;
  getIds(keyword: string): number[];
  getName(id: number): string | undefined;

  getById(id: number): InspectionType | undefined;
  create(inspectionType: InspectionType): Promise<void>;
  update(inspectionType: InspectionType): Promise<void>;
  delete(id: number): Promise<void>;
}
