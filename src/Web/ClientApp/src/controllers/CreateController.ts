import { ChangeEvent } from "react";
import {
  InspectionGroup,
  InspectionSheetInitialState,
  InspectionType,
} from "../entities";
import {
  ICreateController,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class CreateController implements ICreateController {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of CreateController class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
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

  /** @inheritdoc */
  async fetchInspectionMasterData(): Promise<void> {
    await this.groupUseCase
      .fetchInspectionGroups()
      .then((groups: InspectionGroup[]) => {
        this.sheetUseCase.setGroupId(groups[0].inspectionGroupId);
      });
    await this.typeUseCase
      .fetchInspectionTypes()
      .then((types: InspectionType[]) => {
        this.sheetUseCase.setTypeId(types[0].inspectionTypeId);
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
  changeGroupId = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const id = parseInt(e.target.value, 10);
    if (!Number.isNaN(id)) {
      this.sheetUseCase.setGroupId(id)
    }
  }

  /** @inheritdoc */
  changeTypeId = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void  => {
    const id = parseInt(e.target.value, 10);
    if (!Number.isNaN(id)) {
      this.sheetUseCase.setTypeId(id)
    }
  }

  /** @inheritdoc */
  addEquipment(): void {
    this.sheetUseCase.addEquipment();
  }

  /** @inheritdoc */
  async createInspectionSheet(): Promise<void> {
    await this.sheetUseCase.createInspectionSheet();
  }
}
