import { InspectionGroupController } from "..";

describe("InspectionGroupController unit test", () => {
  test("Fetch inspection groups correctly", async () => {
    const useCase = {
      fetchInspectionGroups: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.fetchInspectionGroups();
    expect(useCase.fetchInspectionGroups).toHaveBeenCalledTimes(1);
  });

  test("Create edit item correctly", () => {
    const useCase = {
      createEditItem: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    target.createEditItem();
    expect(useCase.createEditItem).toHaveBeenCalled();
  });

  test("Set edit item correctly", () => {
    const useCase = {
      setEditItem: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    target.setEditItem(10);
    expect(useCase.setEditItem).toHaveBeenCalledWith(10);
  });

  test("Set edit item correctly", () => {
    const useCase = {
      editGroup: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    target.editGroup({ target: { name: "description", value: "group" } });
    expect(useCase.editGroup).toHaveBeenCalledWith("description", "group");
  });

  test("Create inspection group correctly", async () => {
    const useCase = {
      create: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.create({ id: 1, description: "group" });
    expect(useCase.create).toHaveBeenCalledWith({
      id: 1,
      description: "group",
    });
  });

  test("Update inspection group correctly", async () => {
    const useCase = {
      update: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.update({ id: 1, description: "group" });
    expect(useCase.update).toHaveBeenCalledWith({
      id: 1,
      description: "group",
    });
  });

  test("Delete inspection groups correctly", async () => {
    const useCase = {
      delete: jest.fn(async () => {}),
    };
    const target = new InspectionGroupController(useCase);
    await target.delete(10);
    expect(useCase.delete).toHaveBeenCalledWith(10);
  });
});
