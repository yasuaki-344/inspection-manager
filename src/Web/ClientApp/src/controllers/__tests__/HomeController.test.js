import { HomeController } from "..";

describe("HomeController unit test", () => {
  test("fetch display data correctly", async () => {
    const typeUseCase = {
      fetchInspectionTypes: jest.fn(async () => {}),
    };
    const groupUseCase = {
      fetchInspectionGroup: jest.fn(async () => {}),
    };
    const target = new HomeController(typeUseCase, groupUseCase);
    await target.fetchDisplayData();
    expect(typeUseCase.fetchInspectionTypes).toHaveBeenCalledTimes(1);
    expect(groupUseCase.fetchInspectionGroup).toHaveBeenCalledTimes(1);
  });
});
