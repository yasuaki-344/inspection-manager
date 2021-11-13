import { CreateController } from "..";

describe("CreateController unit test", () => {
  test("Change sheet name correctly", () => {
    const groupUseCase = {};
    const typeUseCase = {};
    const sheetUseCase = {
      setSheetName: jest.fn(() => {}),
    };
    const target = new CreateController(
      groupUseCase,
      typeUseCase,
      sheetUseCase
    );
    target.changeSheetName({ target: { value: "test" } });
    expect(sheetUseCase.setSheetName).toBeCalledWith("test");
  });

  test("Change group ID correctly", () => {
    const groupUseCase = {};
    const typeUseCase = {};
    const sheetUseCase = {
      setGroupId: jest.fn(() => {}),
    };
    const target = new CreateController(
      groupUseCase,
      typeUseCase,
      sheetUseCase
    );
    target.changeGroupId({ target: { value: "10" } });
    expect(sheetUseCase.setGroupId).toBeCalledWith(10);
  });

  test("Change type ID correctly", () => {
    const groupUseCase = {};
    const typeUseCase = {};
    const sheetUseCase = {
      setTypeId: jest.fn(() => {}),
    };
    const target = new CreateController(
      groupUseCase,
      typeUseCase,
      sheetUseCase
    );
    target.changeTypeId({ target: { value: "20" } });
    expect(sheetUseCase.setTypeId).toBeCalledWith(20);
  });

  test("Add equipment correctly", () => {
    const groupUseCase = {};
    const typeUseCase = {};
    const sheetUseCase = {
      addEquipment: jest.fn(() => {}),
    };
    const target = new CreateController(
      groupUseCase,
      typeUseCase,
      sheetUseCase
    );
    target.addEquipment();
    expect(sheetUseCase.addEquipment).toBeCalled();
  });

});
