import { InspectionType } from "../typescript-fetch";

export interface IInspectionTypeInteractor {
  get(): void
  getById(id: number): InspectionType | undefined
  create(inspectionType: InspectionType): void
  update(inspectionType: InspectionType): void
  delete(id: number): void
}