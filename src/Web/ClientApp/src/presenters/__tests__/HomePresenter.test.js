import { HomePresenter } from "..";

describe("HomePresenter unit test", () => {
  test("Get type name correctly", async () => {
    const typeUseCase = {
      getName: jest.fn(() => "test"),
    };
    const groupUseCase = {};
    const sheetUseCase = {};
    const target = new HomePresenter(typeUseCase, groupUseCase, sheetUseCase);
    const actual = target.getTypeName(1);
    expect(actual).toEqual("test");
  });

  test("Get group name correctly", async () => {
    const typeUseCase = {};
    const groupUseCase = {
      getName: jest.fn(() => "test"),
    };
    const sheetUseCase = {};
    const target = new HomePresenter(typeUseCase, groupUseCase, sheetUseCase);
    const actual = target.getGroupName(1);
    expect(actual).toEqual("test");
  });
});
