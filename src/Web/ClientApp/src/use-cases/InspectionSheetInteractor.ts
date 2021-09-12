import React from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetInitialState } from '../entities';
import { SHEET_ACTION_TYPE } from '../entities';
import { InspectionSheetRepository } from '../infrastructure';
import { IInspectionSheetInteractor, IInspectionSheetRepository } from '../interfaces';

export class InspectionSheetInteractor implements IInspectionSheetInteractor {
  private readonly state: InspectionSheet
  private readonly dispatch: React.Dispatch<any>
  private readonly repository: IInspectionSheetRepository

  constructor(state: InspectionSheet, dispatch: React.Dispatch<any>) {
    this.state = state
    this.dispatch = dispatch
    this.repository = new InspectionSheetRepository();
  }

  async getAllInspectionSheet(): Promise<Array<InspectionSheet>> {
    return await this.repository.get();
  }

  async getInspectionSheetById(id: number): Promise<void> {
    const sheet = await this.repository.getById(id);
    this.setSheet(sheet);
  };

  async createInspectionSheet(): Promise<void> {
    await this.repository.post(this.state);
    this.setSheet(InspectionSheetInitialState);
  }

  setSheet(sheet: InspectionSheet): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SET_SHEET,
      payload: {
        sheet: sheet
      },
    })
  }

  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_FIELD,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    })
  }

  addEquipment(): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
    })
  }

  removeEquipment(index: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
      payload: {
        equipment_index: index,
      }
    });
  }

  updateEquipment(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.UPDATE_EQUIPMENT,
      payload: {
        name: event.target.name,
        value: event.target.value,
        equipment_index: index,
      },
    });
  }

  swapEquipment(srcIndex: number, dstIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_EQUIPMENT,
      payload: {
        equipment_index: srcIndex,
        swap_index: dstIndex,
      },
    });
  }

  addInspectionItem(index: number, item: InspectionItem): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM,
      payload: {
        equipment_index: index,
        inspection_item: item,
      }
    });
  }

  removeInspectionItem(equipmentIndex: number, itemIndex: number): void {
    this.dispatch({
      type: SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM,
      payload: {
        equipment_index: equipmentIndex,
        inspection_item_index: itemIndex,
      }
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
        equipment_index: equipmentIndex,
        inspection_item_index: itemIndex,
        inspection_item: item,
      }
    });
  }

  swapInspectionItem(equipmentIndex: number, srcIndex: number, dstIndex: number) {
    this.dispatch({
      type: SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM,
      payload: {
        equipment_index: equipmentIndex,
        inspection_item_index: srcIndex,
        swap_index: dstIndex,
      }
    });
  }
}
