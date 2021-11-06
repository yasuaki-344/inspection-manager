import { InspectionGroupRepository } from "..";
import { InspectionGroupsApi } from "../../typescript-fetch";

describe("InspectionGroupRepository unit test", () => {
  test("Get inspection groups correctly", async () => {
    const apiSpy = jest
      .spyOn(InspectionGroupsApi.prototype, "inspectionGroupsGet")
      .mockReturnValue([
        { inspection_group_id: 1, description: "group1" },
        { inspection_group_id: 2, description: "group2" },
      ]);
    const target = new InspectionGroupRepository();
    const groups = await target.get();
    expect(apiSpy).toHaveBeenCalled();
    expect(groups).toEqual([
      { inspectionGroupId: 1, description: "group1" },
      { inspectionGroupId: 2, description: "group2" },
    ]);
  });

  test("Delete inspection groups correctly", async () => {
    const apiSpy = jest
      .spyOn(
        InspectionGroupsApi.prototype,
        "inspectionGroupsInspectionGroupIdDelete"
      )
      .mockReturnValue();
    const target = new InspectionGroupRepository();
    await target.delete(10);
    expect(apiSpy).toHaveBeenCalledWith({ inspectionGroupId: 10 });
  });
});
