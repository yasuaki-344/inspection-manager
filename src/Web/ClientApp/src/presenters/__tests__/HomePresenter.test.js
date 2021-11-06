import { HomePresenter } from "..";

describe("HomePresenter unit test", () => {
  test("Get group IDs correctly", async () => {
    const typeUseCase = {}
    const groupUseCase = {
      getIds: jest.fn((keyword) => [1, 2, 3])
    }
    const target = new HomePresenter(typeUseCase, groupUseCase);
    const actual = target.getGroupIds("keyword");
    expect(actual).toEqual(expect.arrayContaining([1, 2, 3]));
  });

  test("Get group name correctly", async () => {
    const typeUseCase = {}
    const groupUseCase = {
      getName: jest.fn((id) => "test")
    }
    const target = new HomePresenter(typeUseCase, groupUseCase);
    const actual = target.getGroupName(1);
    expect(actual).toEqual("test");
  });
});
