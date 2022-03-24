import { DetailController } from "..";

describe("DetailController unit test", () => {
  test("fetch display data correctly", async () => {
    const groupUseCase = {
      fetchInspectionGroups: jest.fn(async () => {}),
    };
    const typeUseCase = {
      fetchInspectionTypes: jest.fn(async () => {}),
    };
    const sheetUseCase = {
      fetchInspectionSheetById: jest.fn(async () => {}),
    };
    const target = new DetailController(
      groupUseCase,
      typeUseCase,
      sheetUseCase
    );
    await target.fetchDisplayData(3);
    expect(groupUseCase.fetchInspectionGroups).toHaveBeenCalled();
    expect(typeUseCase.fetchInspectionTypes).toHaveBeenCalled();
    expect(sheetUseCase.fetchInspectionSheetById).toHaveBeenCalledWith(3);
  });
});
