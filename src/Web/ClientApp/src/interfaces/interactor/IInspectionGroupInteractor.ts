import { InspectionGroup } from "../../entities";

export interface IInspectionGroupInteractor {
  groups: Array<InspectionGroup>;
  get(): void;
  getById(id: number): InspectionGroup | undefined;
  create(inspectionGroup: InspectionGroup): Promise<void>;
  update(inspectionGroup: InspectionGroup): Promise<void>;
  delete(id: number): Promise<void>;
}
