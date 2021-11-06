import { InspectionTypeRepository } from "..";
import { InspectionTypesApi } from "../../typescript-fetch";

describe("InspectionTypeRepository unit test", () => {
  test("Get inspection types correctly", async () => {
    const apiSpy = jest
      .spyOn(InspectionTypesApi.prototype, "inspectionTypesGet")
      .mockReturnValue([
        { inspection_type_id: 1, description: "type1" },
        { inspection_type_id: 2, description: "type2" },
      ]);
    const target = new InspectionTypeRepository();
    const types = await target.get();
    expect(apiSpy).toHaveBeenCalled();
    expect(types).toEqual([
      { inspectionTypeId: 1, description: "type1" },
      { inspectionTypeId: 2, description: "type2" },
    ]);
  });

  test("Post inspection type correctly", async () => {
    const apiSpy = jest
      .spyOn(InspectionTypesApi.prototype, "inspectionTypesPost")
      .mockReturnValue({ inspection_type_id: 1, description: "newType" });
    const target = new InspectionTypeRepository();
    const type = await target.post({
      inspectionTypeId: 1,
      description: "type1",
    });
    expect(apiSpy).toHaveBeenCalledWith({
      inspectionType: { inspection_type_id: 1, description: "type1" },
    });
    expect(type).toEqual({ inspectionTypeId: 1, description: "newType" });
  });

  test("Put inspection type correctly", async () => {
    const apiSpy = jest
      .spyOn(InspectionTypesApi.prototype, "inspectionTypesInspectionTypeIdPut")
      .mockReturnValue({ inspection_type_id: 1, description: "newType" });
    const target = new InspectionTypeRepository();
    const type = await target.put({
      inspectionTypeId: 1,
      description: "type1",
    });
    expect(apiSpy).toHaveBeenCalledWith({
      inspectionTypeId: 1,
      inspectionType: { inspection_type_id: 1, description: "type1" },
    });
    expect(type).toEqual({ inspectionTypeId: 1, description: "newType" });
  });

  test("Delete inspection type correctly", async () => {
    const apiSpy = jest
      .spyOn(
        InspectionTypesApi.prototype,
        "inspectionTypesInspectionTypeIdDelete"
      )
      .mockReturnValue();
    const target = new InspectionTypeRepository();
    target.delete(1);
    expect(apiSpy).toHaveBeenCalledWith({ inspectionTypeId: 1 });
  });
});
