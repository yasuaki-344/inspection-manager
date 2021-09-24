import { IInspectionTypeRepository } from "../interfaces";
import { InspectionType, toCamelCase, toSnakeCase } from "../entities";

import {
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
    return toCamelCase(res);
  }

  async post(inspectionType: InspectionType): Promise<InspectionType> {
    const req = toSnakeCase(inspectionType);
    const res = await this.api.inspectionTypesPost({
      inspectionType: req,
    });
    return toCamelCase(res);
  }

  async put(inspectionType: InspectionType): Promise<InspectionType> {
    const req = toSnakeCase(inspectionType);
    const res = await this.api.inspectionTypesInspectionTypeIdPut({
      inspectionTypeId: req.inspection_type_id,
      inspectionType: req,
    });
    return toCamelCase(res);
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionTypesInspectionTypeIdDelete({
      inspectionTypeId: id,
    });
  }
}
