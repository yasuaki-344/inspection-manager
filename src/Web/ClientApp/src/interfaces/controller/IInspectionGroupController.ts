import { InspectionGroup } from "../../entities";

export interface IInspectionGroupController {
  create(inspectionGroup: InspectionGroup): Promise<void>;
  update(inspectionGroup: InspectionGroup): Promise<void>;
  delete(id: number): Promise<void>;
}
