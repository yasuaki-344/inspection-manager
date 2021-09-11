import { IInspectionGroupRepository } from "../interfaces";
import { InspectionGroup, InspectionGroupsApi, InspectionGroupsApiInterface } from "../typescript-fetch";

export class InspectionGroupRepository implements IInspectionGroupRepository {
  private readonly api: InspectionGroupsApiInterface

  constructor() {
    this.api = new InspectionGroupsApi();
  }

  async get(): Promise<Array<InspectionGroup>> {
    return await this.api.inspectionGroupsGet()
  }

  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    return await this.api.inspectionGroupsPost({
      'inspectionGroup': inspectionGroup
    });
  }

  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    return await this.api.inspectionGroupsInspectionGroupIdPut({
      inspectionGroupId: inspectionGroup.inspection_group_id,
      inspectionGroup: inspectionGroup
    });
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionGroupsInspectionGroupIdDelete({
      'inspectionGroupId': id
    })
  }
}