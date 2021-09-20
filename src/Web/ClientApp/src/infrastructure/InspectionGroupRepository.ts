import { IInspectionGroupRepository } from "../interfaces";
import {
  InspectionGroup,
  InspectionGroupsApi,
  InspectionGroupsApiInterface,
} from "../typescript-fetch";

export class InspectionGroupRepository implements IInspectionGroupRepository {
  private readonly api: InspectionGroupsApiInterface;

  constructor() {
    this.api = new InspectionGroupsApi();
  }

  async get(): Promise<Array<InspectionGroup>> {
    const res = await this.api.inspectionGroupsGet();
    return res;
  }

  async post(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.inspectionGroupsPost({
      inspectionGroup,
    });
    return res;
  }

  async put(inspectionGroup: InspectionGroup): Promise<InspectionGroup> {
    const res = await this.api.inspectionGroupsInspectionGroupIdPut({
      inspectionGroupId: inspectionGroup.inspection_group_id,
      inspectionGroup,
    });
    return res;
  }

  async delete(id: number): Promise<void> {
    await this.api.inspectionGroupsInspectionGroupIdDelete({
      inspectionGroupId: id,
    });
  }
}
