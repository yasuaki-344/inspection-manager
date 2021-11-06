import { InspectionGroup } from "../../entities";

export interface IInspectionGroupController {
  fetchInspectionGroup(): Promise<void>;
  create(inspectionGroup: InspectionGroup): Promise<void>;
  update(inspectionGroup: InspectionGroup): Promise<void>;
  delete(id: number): Promise<void>;
}
