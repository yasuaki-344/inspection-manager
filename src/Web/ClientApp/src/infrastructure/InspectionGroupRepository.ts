import { toCamelCase, InspectionGroup, toSnakeCase } from "../entities";
import { IInspectionGroupRepository } from "../interfaces";
import {
  InspectionGroupsApi,
  InspectionGroupsApiInterface,
} from "../typescript-fetch";

export class InspectionGroupRepository implements IInspectionGroupRepository {
  private readonly api: InspectionGroupsApiInterface;

  constructor() {
    this.api = new InspectionGroupsApi();
  }

  async get(): Promise<InspectionGroup[]> {
    const res = await this.api.inspectionGroupsGet();
    return toCamelCase(res);
  }

  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const req = toSnakeCase(inspectionGroup);
    const res = await this.api.inspectionGroupsPost({
      inspectionGroup: req,
    });
    return toCamelCase(res);
  }

  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const req = toSnakeCase(inspectionGroup);
    const res = await this.api.inspectionGroupsInspectionGroupIdPut({
      inspectionGroupId: inspectionGroup.inspectionGroupId,
      inspectionGroup: req,
    });
    return toCamelCase(res);
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionGroupsInspectionGroupIdDelete({
      inspectionGroupId: id,
    });
  }
}
