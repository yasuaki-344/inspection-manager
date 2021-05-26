import React from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetAction } from '../Types';

export const TYPES = {
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

export default function InspectionSheetReducer(state: InspectionSheet, action: InspectionSheetAction): any {
  switch (action.type) {
    case TYPES.SET_SHEET:
      return action.payload?.sheet;
    case TYPES.UPDATE_FIELD:
      if (action.payload?.name != null) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      } else {
        return state;
      }
    case TYPES.ADD_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.concat({
          equipment_id: 0,
          equipment_name: '',
          inspection_items: [],
        })
      };
    case TYPES.REMOVE_EQUIPMENT:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null) {
          state.equipments.splice(payload.equipment_index, 1);
          return { ...state };
        }
      }
      return state;
    case TYPES.UPDATE_EQUIPMENT:
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
    case TYPES.SWAP_EQUIPMENT:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.swap_index != null) {
          [state.equipments[payload.equipment_index], state.equipments[payload.swap_index]] =
            [state.equipments[payload.swap_index], state.equipments[payload.equipment_index]];
          return { ...state };
        }
      }
      return state;
    case TYPES.ADD_INSPECTION_ITEM:
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
    case TYPES.REMOVE_INSPECTION_ITEM:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.equipment_index != null && payload.inspection_item_index != null) {
          state.equipments[payload.equipment_index]
            .inspection_items.splice(payload.inspection_item_index, 1);
          return { ...state };
        }
      }
      return state;
    case TYPES.UPDATE_INSPECTION_ITEM:
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
    case TYPES.SWAP_INSPECTION_ITEM:
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
    type: TYPES.SET_SHEET,
    payload: {
      sheet: inspectionSheet
    },
  }
};

export const updateFieldAction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_FIELD,
    payload: {
      name: event.target.name,
      value: event.target.value,
    },
  }
};

export const addEquipmentAction = (): InspectionSheetAction => {
  return {
    type: TYPES.ADD_EQUIPMENT,
  }
};

export const removeEquipmentAction = (index: number): InspectionSheetAction => {
  return {
    type: TYPES.REMOVE_EQUIPMENT,
    payload: {
      equipment_index: index,
    }
  }
};

export const updateEquipmentAction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_EQUIPMENT,
    payload: {
      name: event.target.name,
      value: event.target.value,
      equipment_index: index,
    },
  }
};

export const swapEquipmentAction = (srcIndex: number, dstId: number): InspectionSheetAction => {
  return {
    type: TYPES.SWAP_EQUIPMENT,
    payload: {
      equipment_index: srcIndex,
      swap_index: dstId,
    },
  }
};

export const addInspectionItemAction = (index: number, item: InspectionItem): InspectionSheetAction => {
  return {
    type: TYPES.ADD_INSPECTION_ITEM,
    payload: {
      equipment_index: index,
      inspection_item: item,
    }
  }
};

export const removeInspectionItemAction = (equipmentIndex: number, itemIndex: number): InspectionSheetAction => {
  return {
    type: TYPES.REMOVE_INSPECTION_ITEM,
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
    type: TYPES.UPDATE_INSPECTION_ITEM,
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
    type: TYPES.SWAP_INSPECTION_ITEM,
    payload: {
      equipment_index: equipmentIndex,
      inspection_item_index: srcIndex,
      swap_index: dstIndex,
    }
  }
};
