import { InspectionType } from "../../entities";

export interface IInspectionTypeRepository {
  get(): Promise<Array<InspectionType>>;
  post(inspectionType: InspectionType): Promise<InspectionType>;
  put(inspectionType: InspectionType): Promise<InspectionType>;
  delete(id: number): Promise<void>;
}
