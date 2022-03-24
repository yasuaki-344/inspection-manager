import { InspectionSheet } from "../entities";
import {
  IHomePresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class HomePresenter implements IHomePresenter {
  readonly inspectionSheets: InspectionSheet[];

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  /**
   * Initializes a new instance of HomeController class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.inspectionSheets = sheetUseCase.filteredSheets;
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
  }

  /** @inheritdoc */
  getGroupName(id: number): string | undefined {
    return this.groupUseCase.getName(id);
  }

  /** @inheritdoc */
  getTypeName(id: number): string | undefined {
    return this.typeUseCase.getName(id);
  }
}
