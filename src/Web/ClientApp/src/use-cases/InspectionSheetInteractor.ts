import React, { Dispatch, SetStateAction, useReducer, useState } from "react";
import {
  InspectionItem,
  InspectionSheet,
  InspectionSheetAction,
  InspectionSheetInitialState,
  InspectionSheetReducer,
  SHEET_ACTION_TYPE,
} from "../entities";
import { InspectionSheetRepository } from "../infrastructure";
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
   */
  constructor() {
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
    this.repository = new InspectionSheetRepository();
  }

  /** @inheritdoc */
  async fetchAllInspectionSheets(): Promise<void> {
    await this.repository.get().then((res: InspectionSheet[]) => {
      this.setSheets(res);
      this.setFilteredSheets(res);
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
  resetSearchedInspectionSheets(): void {
    this.setFilteredSheets(this.sheets);
  }

  async fetchInspectionSheetById(id: number): Promise<void> {
    const sheet = await this.repository.getById(id);
    this.setSheet(sheet);
  }

  async createInspectionSheet(): Promise<void> {
    await this.repository.post(this.sheet);
    this.setSheet(InspectionSheetInitialState);
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

  setSheet(sheet: InspectionSheet): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_SHEET,
      payload: { sheet },
    });
  }

  updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_FIELD,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  }

  addEquipment(): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
    });
  }

  removeEquipment(index: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
      payload: {
        equipmentIndex: index,
      },
    });
  }

  updateEquipment(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_EQUIPMENT,
      payload: {
        name: event.target.name,
        value: event.target.value,
        equipmentIndex: index,
      },
    });
  }

  swapEquipment(srcIndex: number, dstIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_EQUIPMENT,
      payload: {
        equipmentIndex: srcIndex,
        swapIndex: dstIndex,
      },
    });
  }

  addInspectionItem(index: number, item: InspectionItem): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM,
      payload: {
        equipmentIndex: index,
        inspectionItem: item,
      },
    });
  }

  removeInspectionItem(equipmentIndex: number, itemIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM,
      payload: {
        equipmentIndex,
        inspectionItemIndex: itemIndex,
      },
    });
  }

  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM,
      payload: {
        equipmentIndex,
        inspectionItemIndex: itemIndex,
        inspectionItem: item,
      },
    });
  }

  swapInspectionItem(
    equipmentIndex: number,
    srcIndex: number,
    dstIndex: number
  ) {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM,
      payload: {
        equipmentIndex,
        inspectionItemIndex: srcIndex,
        swapIndex: dstIndex,
      },
    });
  }
}
