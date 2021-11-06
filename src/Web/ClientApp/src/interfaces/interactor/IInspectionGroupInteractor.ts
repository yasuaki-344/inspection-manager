import { InspectionGroup } from "../../entities";

export interface IInspectionGroupInteractor {
  groups: Array<InspectionGroup>;
  fetchInspectionGroup(): Promise<void>;
  getIds(keyword: string): number[];
  getName(id: number): string | undefined;

  getById(id: number): InspectionGroup | undefined;
  create(inspectionGroup: InspectionGroup): Promise<void>;
  update(inspectionGroup: InspectionGroup): Promise<void>;
  delete(id: number): Promise<void>;
}
