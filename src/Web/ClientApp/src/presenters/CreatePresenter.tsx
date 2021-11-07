import {
  ICreatePresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class CreatePresenter implements ICreatePresenter {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of CreatePresenter class
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
}
