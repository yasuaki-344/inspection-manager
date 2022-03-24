import { Equipment } from "../entities";
import {
  IDetailPresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class DetailPresenter implements IDetailPresenter {
  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  readonly sheetName: string;

  readonly equipments: Equipment[];

  /**
   * Initializes a new instance of DetailPresenter class
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

    this.sheetName = this.sheetUseCase.sheet.sheetName;
    this.equipments = sheetUseCase.sheet.equipments;
  }

  /** @inheritdoc */
  getInspectionGroup(): string | undefined {
    const { inspectionGroupId } = this.sheetUseCase.sheet;
    return this.groupUseCase.getName(inspectionGroupId);
  }

  /** @inheritdoc */
  getInspectionType(): string | undefined {
    const { inspectionTypeId } = this.sheetUseCase.sheet;
    return this.typeUseCase.getName(inspectionTypeId);
  }
}
