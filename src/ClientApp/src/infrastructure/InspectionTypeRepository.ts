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

  async get(): Promise<InspectionType[]> {
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
    const res = await this.api.inspectionTypesIdPut({
      id: inspectionType.id,
      inspectionType,
    });
    return res;
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionTypesIdDelete({
      id,
    });
  }
}
