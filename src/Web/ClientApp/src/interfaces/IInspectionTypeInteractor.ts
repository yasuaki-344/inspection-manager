import { InspectionType } from "../typescript-fetch";

export interface IInspectionTypeInteractor {
  getTypes(): InspectionType[]
  get(): void
  getById(id: number): InspectionType | undefined
  create(inspectionType: InspectionType): Promise<void>
  update(inspectionType: InspectionType): Promise<void>
  delete(id: number): Promise<void>
}