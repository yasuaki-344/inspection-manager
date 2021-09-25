
import { InspectionType } from "../../entities";

export interface IInspectionTypeController {
  create(inspectionType: InspectionType): Promise<void>
  update(inspectionType: InspectionType): Promise<void>
  delete(id: number): Promise<void>
}
