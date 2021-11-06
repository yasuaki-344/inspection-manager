import { InspectionGroupController } from "..";

describe("InspectionGroupController unit test", () => {
  test("fetch inspection groups correctly", async () => {
    const useCase = {
      fetchInspectionGroup: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.fetchInspectionGroup();
    expect(useCase.fetchInspectionGroup).toHaveBeenCalledTimes(1);
  });

  test("delete inspection groups correctly", async () => {
    const useCase = {
      delete: jest.fn(async (id) => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.delete(10);
    expect(useCase.delete).toHaveBeenCalledWith(10);
  });
});
