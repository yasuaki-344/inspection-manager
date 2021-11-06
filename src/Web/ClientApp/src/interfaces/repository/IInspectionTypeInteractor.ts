import { InspectionType } from "../../entities";

export interface IInspectionTypeInteractor {
  types: Array<InspectionType>;
  fetchInspectionTypes(): Promise<void>;
  get(): void;
  getById(id: number): InspectionType | undefined;
  create(inspectionType: InspectionType): Promise<void>;
  update(inspectionType: InspectionType): Promise<void>;
  delete(id: number): Promise<void>;
}
