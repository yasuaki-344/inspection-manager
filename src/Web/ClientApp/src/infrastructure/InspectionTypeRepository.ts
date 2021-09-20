import { IInspectionTypeRepository } from "../interfaces";
import {
  InspectionType,
  InspectionTypesApi,
  InspectionTypesApiInterface,
} from "../typescript-fetch";

export class InspectionTypeRepository implements IInspectionTypeRepository {
  private readonly api: InspectionTypesApiInterface;

  constructor() {
    this.api = new InspectionTypesApi();
  }

  async get(): Promise<Array<InspectionType>> {
    const res = await this.api.inspectionTypesGet();
    return res;
  }

  async post(inspectionType: InspectionType): Promise<InspectionType> {
    const res = await this.api.inspectionTypesPost({
      inspectionType,
    });
    return res;
  }

  async put(inspectionType: InspectionType): Promise<InspectionType> {
    const res = await this.api.inspectionTypesInspectionTypeIdPut({
      inspectionTypeId: inspectionType.inspection_type_id,
      inspectionType,
    });
    return res;
  }

  async delete(id: number): Promise<void> {
    const res = await this.api.inspectionTypesInspectionTypeIdDelete({
      inspectionTypeId: id,
    });
    return res;
  }
}
