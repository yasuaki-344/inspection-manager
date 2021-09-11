import { InspectionGroup } from "../typescript-fetch";

export interface IInspectionGroupInteractor {
  getGroups(): Array<InspectionGroup>
  get(): void
  getById(id: number): InspectionGroup | undefined
  create(inspectionGroup: InspectionGroup): Promise<void>
  update(inspectionGroup: InspectionGroup): Promise<void>
  delete(id: number): Promise<void>
}