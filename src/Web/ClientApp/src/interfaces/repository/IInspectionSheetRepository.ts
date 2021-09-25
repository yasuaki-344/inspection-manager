import { InspectionSheet } from "../../entities";

export interface IInspectionSheetRepository {
  get(): Promise<Array<InspectionSheet>>;
  getById(id: number): Promise<InspectionSheet>;
  post(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;
  put(inspectionSheet: InspectionSheet): Promise<InspectionSheet>;
  delete(id: number): Promise<void>;
}
