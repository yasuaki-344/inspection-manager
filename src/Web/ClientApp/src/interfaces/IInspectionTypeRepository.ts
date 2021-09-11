import { InspectionType } from "../typescript-fetch";

export interface IInspectionTypeRepository {
  get(): Promise<Array<InspectionType>>
  post(inspectionType: InspectionType): Promise<void>
  update(inspectionType: InspectionType): Promise<void>
  delete(id: number): Promise<void>
}