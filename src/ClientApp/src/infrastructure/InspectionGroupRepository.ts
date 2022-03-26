import { IInspectionGroupRepository } from "../interfaces";
import { InspectionGroup, InspectionGroupApi } from "../typescript-fetch";

export class InspectionGroupRepository implements IInspectionGroupRepository {
  private readonly api: InspectionGroupApi;

  /**
   * Initializes a new instance of InspectionGroupRepository class.
   */
  constructor() {
    this.api = new InspectionGroupApi();
  }

  /** @inheritdoc */
  async get(): Promise<InspectionGroup[]> {
    const res = await this.api.apiV1InspectionGroupsGet();
    return res;
  }

  /** @inheritdoc */
  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.apiV1InspectionGroupsPost({
      inspectionGroup,
    });
    return res;
  }

  /** @inheritdoc */
  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.apiV1InspectionGroupsIdPut({
      id: inspectionGroup.id,
      inspectionGroup,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.apiV1InspectionGroupsIdDelete({
      id,
    });
  }
}
