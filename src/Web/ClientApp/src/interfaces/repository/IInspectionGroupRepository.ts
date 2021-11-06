import { InspectionGroup } from "../../entities";

export interface IInspectionGroupRepository {
  get(): Promise<InspectionGroup[]>;
  post(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;
  put(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;
  delete(id: number): Promise<void>;
}
