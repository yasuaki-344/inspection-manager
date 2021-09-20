import { InspectionGroup } from "../typescript-fetch";

export interface IInspectionGroupRepository {
  get(): Promise<Array<InspectionGroup>>;
  post(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;
  put(inspectionGroup: InspectionGroup): Promise<InspectionGroup>;
  delete(id: number): Promise<void>;
}
