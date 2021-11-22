import { Dispatch, SetStateAction, useReducer, useState } from "react";
import {
  InspectionItem,
  InspectionSheet,
  InspectionSheetAction,
  InspectionSheetInitialState,
  InspectionSheetReducer,
  SHEET_ACTION_TYPE,
} from "../entities";
import {
  IInspectionSheetInteractor,
  IInspectionSheetRepository,
} from "../interfaces";

export class InspectionSheetInteractor implements IInspectionSheetInteractor {
  readonly sheets: InspectionSheet[];

  private readonly setSheets: Dispatch<SetStateAction<InspectionSheet[]>>;

  readonly filteredSheets: InspectionSheet[];

  private readonly setFilteredSheets: Dispatch<
    SetStateAction<InspectionSheet[]>
  >;

  readonly sheet: InspectionSheet;

  private readonly dispatch: Dispatch<InspectionSheetAction>;

  private readonly repository: IInspectionSheetRepository;

  /**
   * Initializes a new instance of InspectionSheetInteractor.
   * @param repository IInspectionSheetRepository object.
   */
  constructor(repository: IInspectionSheetRepository) {
    const [sheets, setSheets] = useState<InspectionSheet[]>([]);
    this.sheets = sheets;
    this.setSheets = setSheets;
    const [filteredSheets, setFilteredSheets] = useState<InspectionSheet[]>([]);
    this.filteredSheets = filteredSheets;
    this.setFilteredSheets = setFilteredSheets;
    const [sheet, sheetDispatch] = useReducer(
      InspectionSheetReducer,
      InspectionSheetInitialState
    );
    this.sheet = sheet;
    this.dispatch = sheetDispatch;
    this.repository = repository;
  }

  /** @inheritdoc */
  async fetchAllInspectionSheets(): Promise<void> {
    await this.repository.get().then((res: InspectionSheet[]) => {
      this.setSheets(res);
      this.setFilteredSheets(res);
    });
  }

  /** @inheritdoc */
  async fetchInspectionSheetById(id: number): Promise<void> {
    await this.repository.getById(id).then((res: InspectionSheet) => {
      this.setSheet(res);
    });
  }

  /** @inheritdoc */
  searchInspectionSheet(
    groupIds: number[],
    typeIds: number[],
    sheetKeyword: string
  ): void {
    this.setFilteredSheets(
      this.sheets.filter(
        (x: InspectionSheet) =>
          x.sheetName.includes(sheetKeyword) &&
          groupIds.includes(x.inspectionGroupId) &&
          typeIds.includes(x.inspectionTypeId)
      )
    );
  }

  /** @inheritdoc */
  setSheet(sheet: InspectionSheet): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_SHEET,
      payload: { sheet },
    });
  }

  /** @inheritdoc */
  resetSearchedInspectionSheets(): void {
    this.setFilteredSheets(this.sheets);
  }

  /** @inheritdoc */
  setSheetName(sheetName: string): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_STRING_FIELD,
      payload: {
        name: "sheetName",
        stringValue: sheetName,
      },
    });
  }

  /** @inheritdoc */
  setGroupId(groupId: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
      payload: {
        name: "inspectionGroupId",
        numericValue: groupId,
      },
    });
  }

  /** @inheritdoc */
  setTypeId(typeId: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_NUMERIC_FIELD,
      payload: {
        name: "inspectionTypeId",
        numericValue: typeId,
      },
    });
  }

  /** @inheritdoc */
  addEquipment(): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
      payload: {},
    });
  }

  /** @inheritdoc */
  removeEquipment(orderIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
      payload: {
        numericValue: orderIndex,
      },
    });
  }

  /** @inheritdoc */
  swapEquipments(srcOrderIndex: number, dstOrderIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_EQUIPMENTS,
      payload: {
        srcOrderIndex,
        dstOrderIndex,
      },
    });
  }

  /** @inheritdoc */
  setEquipmentName(orderIndex: number, name: string): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_EQUIPMENT_STRING_FIELD,
      payload: {
        equipmentOrderIndex: orderIndex,
        name: "equipmentName",
        stringValue: name,
      },
    });
  }

  /** @inheritdoc */
  async createInspectionSheet(): Promise<void> {
    await this.repository.post(this.sheet);
  }

  async updateInspectionSheet(): Promise<void> {
    const sheet = await this.repository.put(this.sheet);
    this.setSheet(sheet);
  }

  /** @inheritdoc */
  async removeInspectionSheet(id: number): Promise<void> {
    await this.repository.delete(id).then(() => {
      this.setSheets(
        this.sheets.filter((x: InspectionSheet) => x.sheetId !== id)
      );
      this.setFilteredSheets(
        this.filteredSheets.filter((x: InspectionSheet) => x.sheetId !== id)
      );
    });
  }

  /** @inheritdoc */
  addInspectionItem(index: number, item: InspectionItem): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM,
      payload: {
        equipmentOrderIndex: index,
        inspectionItem: item,
      },
    });
  }

  /** @inheritdoc */
  removeInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number
  ): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM,
      payload: {
        equipmentOrderIndex,
        itemOrderIndex,
      },
    });
  }

  updateInspectionItem(
    equipmentOrderIndex: number,
    itemOrderIndex: number,
    item: InspectionItem
  ): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM,
      payload: {
        equipmentOrderIndex,
        itemOrderIndex,
        inspectionItem: item,
      },
    });
  }

  swapInspectionItem(
    equipmentOrderIndex: number,
    srcOrderIndex: number,
    dstOrderIndex: number
  ) {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEMS,
      payload: {
        equipmentOrderIndex,
        srcOrderIndex,
        dstOrderIndex,
      },
    });
  }
}
