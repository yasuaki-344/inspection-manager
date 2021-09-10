import React from 'react';
import { InspectionSheetAction } from '../components/inspection/Types';
import { InspectionItem, InspectionSheet } from '.';

export const SHEET_ACTION_TYPE = {
  SET_SHEET: 'SET_SHEET',
  UPDATE_FIELD: 'UPDATE_FIELD',
  ADD_EQUIPMENT: 'ADD_EQUIPMENT',
  REMOVE_EQUIPMENT: 'REMOVE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  SWAP_EQUIPMENT: 'SWAP_EQUIPMENT',
  ADD_INSPECTION_ITEM: 'ADD_INSPECTION_ITEM',
  REMOVE_INSPECTION_ITEM: 'REMOVE_INSPECTION_ITEM',
  UPDATE_INSPECTION_ITEM: 'UPDATE_INSPECTION_ITEM',
  SWAP_INSPECTION_ITEM: 'SWAP_INSPECTION_ITEM',
};

export function InspectionSheetReducer(state: InspectionSheet, action: InspectionSheetAction): any {
  switch (action.type) {
    case SHEET_ACTION_TYPE.SET_SHEET:
      return action.payload?.sheet;
    case SHEET_ACTION_TYPE.UPDATE_FIELD:
      if (action.payload?.name != null) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      } else {
        return state;
      }
    case SHEET_ACTION_TYPE.ADD_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.concat({
          equipment_id: 0,
          equipment_name: '',
          inspection_items: [],
        })
      };
    case SHEET_ACTION_TYPE.REMOVE_EQUIPMENT:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null) {
          state.equipments.splice(payload.equipment_index, 1);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_EQUIPMENT:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.name != null) {
          state.equipments[payload.equipment_index] = {
            ...state.equipments[payload.equipment_index],
            [payload.name]: payload.value,
          };
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.SWAP_EQUIPMENT:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.swap_index != null) {
          [state.equipments[payload.equipment_index], state.equipments[payload.swap_index]] =
            [state.equipments[payload.swap_index], state.equipments[payload.equipment_index]];
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.inspection_item != null) {
          state.equipments[payload.equipment_index].inspection_items.push(
            payload.inspection_item
          );
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.inspection_item_index != null) {
          state.equipments[payload.equipment_index]
            .inspection_items.splice(payload.inspection_item_index, 1);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null &&
          payload.inspection_item_index != null &&
          payload.inspection_item != null) {
          state.equipments[payload.equipment_index]
            .inspection_items[payload.inspection_item_index] = payload.inspection_item;
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null &&
          payload.inspection_item_index != null &&
          payload.swap_index != null) {
          [state.equipments[payload.equipment_index].inspection_items[payload.inspection_item_index],
          state.equipments[payload.equipment_index].inspection_items[payload.swap_index]] =
            [state.equipments[payload.equipment_index].inspection_items[payload.swap_index],
            state.equipments[payload.equipment_index].inspection_items[payload.equipment_index]];
          return { ...state };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}

export const setSheetAction = (inspectionSheet: InspectionSheet): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.SET_SHEET,
    payload: {
      sheet: inspectionSheet
    },
  }
};

export const updateFieldAction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.UPDATE_FIELD,
    payload: {
      name: event.target.name,
      value: event.target.value,
    },
  }
};

export const addEquipmentAction = (): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.ADD_EQUIPMENT,
  }
};

export const removeEquipmentAction = (index: number): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.REMOVE_EQUIPMENT,
    payload: {
      equipment_index: index,
    }
  }
};

export const updateEquipmentAction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.UPDATE_EQUIPMENT,
    payload: {
      name: event.target.name,
      value: event.target.value,
      equipment_index: index,
    },
  }
};

export const swapEquipmentAction = (srcIndex: number, dstId: number): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.SWAP_EQUIPMENT,
    payload: {
      equipment_index: srcIndex,
      swap_index: dstId,
    },
  }
};

export const addInspectionItemAction = (index: number, item: InspectionItem): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM,
    payload: {
      equipment_index: index,
      inspection_item: item,
    }
  }
};

export const removeInspectionItemAction = (equipmentIndex: number, itemIndex: number): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM,
    payload: {
      equipment_index: equipmentIndex,
      inspection_item_index: itemIndex,
    }
  }
};

export const updateInspectionItemAction = (
  equipmentIndex: number,
  itemIndex: number,
  item: InspectionItem
): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM,
    payload: {
      equipment_index: equipmentIndex,
      inspection_item_index: itemIndex,
      inspection_item: item,
    }
  }
};

export const swapInspectionItemAction = (
  equipmentIndex: number,
  srcIndex: number,
  dstIndex: number
): InspectionSheetAction => {
  return {
    type: SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM,
    payload: {
      equipment_index: equipmentIndex,
      inspection_item_index: srcIndex,
      swap_index: dstIndex,
    }
  }
};
