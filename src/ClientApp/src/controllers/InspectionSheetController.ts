import { ChangeEvent } from "react";
import {
  InspectionGroup,
  InspectionItem,
  InspectionSheetInitialState,
  InspectionType,
} from "../entities";
import {
  IInspectionSheetController,
  IInspectionGroupInteractor,
  IInspectionItemInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class InspectionSheetController implements IInspectionSheetController {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  private readonly itemUseCase: IInspectionItemInteractor;

  /**
   * Initializes a new instance of CreateController class
   * @param typeUseCase Object implements IInspectionTypeInteractor interface.
   * @param groupUseCase Object implements IInspectionGroupInteractor interface.
   * @param sheetUseCase Object implements  IInspectionSheetInteractor interface.
   * @param itemUSeCase Object implements IInspectionItemInteractor interface.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor,
    itemUseCase: IInspectionItemInteractor
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
    this.itemUseCase = itemUseCase;
  }

  /** @inheritdoc */
  initializeInspectionSheet(): void {
    this.sheetUseCase.setSheet(InspectionSheetInitialState);
  }

  /** @inheritdoc */
  async fetchSelectionSheets(): Promise<void> {
    await this.sheetUseCase.fetchAllInspectionSheets();
  }

  /** @inheritdoc */
  async fetchInspectionSheet(id: number): Promise<void> {
    await this.sheetUseCase.fetchInspectionSheetById(id);
  }

  async copyInspectionSheet(id: number): Promise<void> {
    await this.sheetUseCase.copyInspectionSheetFrom(id);
  }

  /** @inheritdoc */
  async fetchInspectionMasterData(): Promise<void> {
    await this.groupUseCase
      .fetchInspectionGroups()
      .then((groups: InspectionGroup[]) => {
        this.sheetUseCase.setGroupId(groups[0].id);
      });
    await this.typeUseCase
      .fetchInspectionTypes()
      .then((types: InspectionType[]) => {
        this.sheetUseCase.setTypeId(types[0].id);
      });
  }

  /** @inheritdoc */
  changeSheetName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const name = e.target.value;
    this.sheetUseCase.setSheetName(name);
  };

  /** @inheritdoc */
  changeGroupId = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const id = parseInt(e.target.value, 10);
    if (!Number.isNaN(id)) {
      this.sheetUseCase.setGroupId(id);
    }
  };

  /** @inheritdoc */
  changeTypeId = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const id = parseInt(e.target.value, 10);
    if (!Number.isNaN(id)) {
      this.sheetUseCase.setTypeId(id);
    }
  };

  /** @inheritdoc */
  addEquipment(): void {
    this.sheetUseCase.addEquipment();
  }

  /** @inheritdoc */
  removeEquipment(orderIndex: number): void {
    this.sheetUseCase.removeEquipment(orderIndex);
  }

  /** @inheritdoc */
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void {
    this.sheetUseCase.swapEquipments(srcOrderIndex, dstOrderIndex);
  }

  /** @inheritdoc */
  changeEquipmentName = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    orderIndex: number
  ): void => {
    const name = e.target.value;
    this.sheetUseCase.setEquipmentName(orderIndex, name);
  };

  setUp(): void {
    this.itemUseCase.setItem({
      inspectionItemId: 0,
      orderIndex: 0,
      inspectionContent: "",
      inputType: 1,
      choices: [],
    });
  }

  setUpItem(item: InspectionItem): void {
    this.itemUseCase.setItem(item);
  }

  addInspectionItem(orderIndex: number): void {
    const item = this.itemUseCase.inspectionItem;
    this.sheetUseCase.addInspectionItem(orderIndex, item);
  }

  removeInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void {
    this.sheetUseCase.removeInspectionItem(equipmentOrderIndex, itemOrderIndex);
  }

  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ): void {
    this.sheetUseCase.swapInspectionItem(equipmentIndex, srcIndex, dstIndex);
  }

  updateInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void {
    const item = this.itemUseCase.inspectionItem;
    this.sheetUseCase.updateInspectionItem(
      equipmentOrderIndex,
      itemOrderIndex,
      item
    );
  }

  /** @inheritdoc */
  updateInspectionItemField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    this.itemUseCase.updateField(name, value);
  };

  /** @inheritdoc */
  updateInspectionItemChoiceField = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    choiceOrderIndex: number
  ): void => {
    const { value } = e.target;
    this.itemUseCase.updateChoice(choiceOrderIndex, value);
  };

  /** @inheritdoc */
  addInspectionItemChoice(): void {
    this.itemUseCase.addChoice();
  }

  /** @inheritdoc */
  removeInspectionItemChoice(choiceOrderIndex: number): void {
    this.itemUseCase.removeChoice(choiceOrderIndex);
  }

  /** @inheritdoc */
  async createInspectionSheet(): Promise<void> {
    await this.sheetUseCase.createInspectionSheet().then(() => {
      this.sheetUseCase.setSheet({
        sheetId: 0,
        sheetName: "",
        inspectionGroupId: this.groupUseCase.groups[0].id,
        inspectionTypeId: this.typeUseCase.types[0].id,
        inspectionGroup: "",
        inspectionType: "",
        equipments: [],
      });
    });
  }

  /** @inheritdoc */
  async updateInspectionSheet(): Promise<void> {
    await this.sheetUseCase.updateInspectionSheet();
  }
}
