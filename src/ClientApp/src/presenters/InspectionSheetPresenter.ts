import {
  Equipment,
  InspectionGroup,
  InspectionItem,
  InspectionSheet,
  InspectionType,
} from "../entities";
import {
  IInspectionSheetPresenter,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
  IInspectionItemInteractor,
} from "../interfaces";

export class InspectionSheetPresenter implements IInspectionSheetPresenter {
  readonly selectionSheets: InspectionSheet[];

  readonly sheetId: number;

  readonly sheetName: string;

  readonly groupId: number;

  readonly groups: InspectionGroup[];

  readonly typeId: number;

  readonly types: InspectionType[];

  readonly equipments: Equipment[];

  readonly item: InspectionItem;

  private readonly itemUseCase: IInspectionItemInteractor;

  /**
   * Initializes a new instance of CreatePresenter class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   * @param itemUSeCase Object implements IInspectionItemInteractor interface.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor,
    itemUseCase: IInspectionItemInteractor
  ) {
    this.itemUseCase = itemUseCase;

    this.selectionSheets = sheetUseCase.sheets;
    this.sheetId = sheetUseCase.sheet.sheetId;
    this.sheetName = sheetUseCase.sheet.sheetName;
    this.groupId = sheetUseCase.sheet.inspectionGroupId;
    this.groups = groupUseCase.groups;
    this.typeId = sheetUseCase.sheet.inspectionTypeId;
    this.types = typeUseCase.types;
    this.equipments = sheetUseCase.sheet.equipments;
    this.item = itemUseCase.inspectionItem;
  }

  isValidInspectionItem(): boolean {
    return this.itemUseCase.isValidInspectionItem();
  }
}
