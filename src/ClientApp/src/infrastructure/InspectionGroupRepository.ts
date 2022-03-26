import { IInspectionGroupRepository } from "../interfaces";
import {
  InspectionGroup,
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
    return res;
  }

  /** @inheritdoc */
  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.inspectionGroupsPost({
      inspectionGroup,
    });
    return res;
  }

  /** @inheritdoc */
  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.inspectionGroupsIdPut({
      id: inspectionGroup.id,
      inspectionGroup,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.inspectionGroupsIdDelete({
      id,
    });
  }
}
