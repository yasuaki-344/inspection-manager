import {
  IDetailController,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class DetailController implements IDetailController {
  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of DetailController class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    groupUseCase: IInspectionGroupInteractor,
    typeUseCase: IInspectionTypeInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.groupUseCase = groupUseCase;
    this.typeUseCase = typeUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  /** @inheritdoc */
  async fetchDisplayData(sheetId: number): Promise<void> {
    await this.groupUseCase.fetchInspectionGroups();
    await this.typeUseCase.fetchInspectionTypes();
    await this.sheetUseCase.fetchInspectionSheetById(sheetId);
  }
}
