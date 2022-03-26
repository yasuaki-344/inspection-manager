import { IInspectionTypeRepository } from "../interfaces";
import { InspectionType, InspectionTypeApi } from "../typescript-fetch";

export class InspectionTypeRepository implements IInspectionTypeRepository {
  private readonly api: InspectionTypeApi;

  constructor() {
    this.api = new InspectionTypeApi();
  }

  async get(): Promise<InspectionType[]> {
    const res = await this.api.apiV1InspectionTypesGet();
    return res;
  }

  async post(inspectionType: InspectionType): Promise<InspectionType> {
    const res = await this.api.apiV1InspectionTypesPost({
      inspectionType,
    });
    return res;
  }

  async put(inspectionType: InspectionType): Promise<InspectionType> {
    const res = await this.api.apiV1InspectionTypesIdPut({
      id: inspectionType.id,
      inspectionType,
    });
    return res;
  }

  async delete(id: number): Promise<void> {
    await this.api.apiV1InspectionTypesIdDelete({
      id,
    });
  }
}
