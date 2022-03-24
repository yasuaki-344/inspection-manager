import { HomeController } from "..";

describe("HomeController unit test", () => {
  test("fetch display data correctly", async () => {
    const typeUseCase = {
      fetchInspectionTypes: jest.fn(async () => {}),
    };
    const groupUseCase = {
      fetchInspectionGroups: jest.fn(async () => {}),
    };
    const sheetUseCase = {
      fetchAllInspectionSheets: jest.fn(async () => {}),
    };
    const target = new HomeController(typeUseCase, groupUseCase, sheetUseCase);
    await target.fetchDisplayData();
    expect(typeUseCase.fetchInspectionTypes).toHaveBeenCalledTimes(1);
    expect(groupUseCase.fetchInspectionGroups).toHaveBeenCalledTimes(1);
    expect(sheetUseCase.fetchAllInspectionSheets).toHaveBeenCalledTimes(1);
  });
});
