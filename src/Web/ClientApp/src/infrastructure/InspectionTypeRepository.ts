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
    return await this.api.inspectionTypesGet();
  }

  async post(inspectionType: InspectionType): Promise<InspectionType> {
    return await this.api.inspectionTypesPost({
      inspectionType: inspectionType,
    });
  }

  async put(inspectionType: InspectionType): Promise<InspectionType> {
    return await this.api.inspectionTypesInspectionTypeIdPut({
      inspectionTypeId: inspectionType.inspection_type_id,
      inspectionType: inspectionType,
    });
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionTypesInspectionTypeIdDelete({
      inspectionTypeId: id,
    });
  }
}
