import React from 'react';
import { InspectionItem, InspectionSheet } from '../entities';
import {
  setSheetAction, updateFieldAction,
  addEquipmentAction, removeEquipmentAction, updateEquipmentAction, swapEquipmentAction,
  addInspectionItemAction, removeInspectionItemAction, updateInspectionItemAction,
  swapInspectionItemAction,
} from '../entities/InspectionSheetReducer';
import { IInspectionSheetInteractor } from '../interfaces';

/**
 * Initial state of InspectionSheet object.
 */
export const initialState = () => {
  return {
    sheet_id: 0,
    sheet_name: '',
    inspection_group_id: 0,
    inspection_type_id: 0,
    inspection_group: '',
    inspection_type: '',
    equipments: [],
  };
};

export class InspectionSheetInteractor implements IInspectionSheetInteractor {
  state: InspectionSheet
  dispatch: React.Dispatch<any>

  constructor(state: InspectionSheet, dispatch: React.Dispatch<any>) {
    this.state = state
    this.dispatch = dispatch
  }

  setSheet(sheet: InspectionSheet): void {
    this.dispatch(setSheetAction(sheet))
  }

  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.dispatch(updateFieldAction(event))
  }

  addEquipment(): void {
    this.dispatch(addEquipmentAction())
  }

  removeEquipment(index: number): void {
    this.dispatch(removeEquipmentAction(index))
  }

  updateEquipment(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
    this.dispatch(updateEquipmentAction(event, index))
  }

  swapEquipment(srcIndex: number, dstIndex: number): void {
    this.dispatch(swapEquipmentAction(srcIndex, dstIndex))
  }

  addInspectionItem(index: number, item: InspectionItem): void {
    this.dispatch(addInspectionItemAction(index, item))
  }

  removeInspectionItem(equipmentIndex: number, itemIndex: number): void {
    this.dispatch(removeInspectionItemAction(equipmentIndex, itemIndex))
  }

  updateInspectionItem(
    equipmentIndex: number,
    itemIndex: number,
    item: InspectionItem
  ): void {
    this.dispatch(updateInspectionItemAction(equipmentIndex, itemIndex, item))
  }

  swapInspectionItem(equipmentIndex: number, srcIndex: number, dstIndex: number) {
    this.dispatch(swapInspectionItemAction(equipmentIndex, srcIndex, dstIndex))
  }

}