import { toCamelCase, InspectionGroup, toSnakeCase } from "../entities";
import { IInspectionGroupRepository } from "../interfaces";
import {
  InspectionGroupsApi,
  InspectionGroupsApiInterface,
} from "../typescript-fetch";

export class InspectionGroupRepository implements IInspectionGroupRepository {
  private readonly api: InspectionGroupsApiInterface;

  /**
   * Initializes a new instance of InspectionGroupRepository class.
   */
  constructor() {
    this.api = new InspectionGroupsApi();
  }

  /** @inheritdoc */
  async get(): Promise<InspectionGroup[]> {
    const res = await this.api.inspectionGroupsGet();
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const req = toSnakeCase(inspectionGroup);
    const res = await this.api.inspectionGroupsPost({
      inspectionGroup: req,
    });
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const req = toSnakeCase(inspectionGroup);
    const res = await this.api.inspectionGroupsInspectionGroupIdPut({
      inspectionGroupId: inspectionGroup.inspectionGroupId,
      inspectionGroup: req,
    });
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.inspectionGroupsInspectionGroupIdDelete({
      inspectionGroupId: id,
    });
  }
}
