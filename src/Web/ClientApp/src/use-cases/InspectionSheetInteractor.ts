import React from "react";
import {
  InspectionItem,
  InspectionSheet,
  InspectionSheetInitialState,
  SHEET_ACTION_TYPE,
} from "../entities";
import { InspectionSheetRepository } from "../infrastructure";
import {
  IInspectionSheetInteractor,
  IInspectionSheetRepository,
} from "../interfaces";

export class InspectionSheetInteractor implements IInspectionSheetInteractor {
  readonly sheet: InspectionSheet;

  private readonly dispatch: React.Dispatch<any>;

  private readonly repository: IInspectionSheetRepository;

  constructor(state: InspectionSheet, dispatch: React.Dispatch<any>) {
    this.sheet = state;
    this.dispatch = dispatch;
    this.repository = new InspectionSheetRepository();
  }

  async getAllInspectionSheet(): Promise<Array<InspectionSheet>> {
    const inspectionSheets = await this.repository.get();
    return inspectionSheets;
  }

  async getInspectionSheetById(id: number): Promise<void> {
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
        inspection_item: item,
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
        inspection_item: item,
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
