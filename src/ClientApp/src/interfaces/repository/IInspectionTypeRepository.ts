import { InspectionType } from "../../typescript-fetch";

export interface IInspectionTypeRepository {
  get(): Promise<InspectionType[]>;
  post(inspectionType: InspectionType): Promise<InspectionType>;
  put(inspectionType: InspectionType): Promise<InspectionType>;
  delete(id: number): Promise<void>;
}
