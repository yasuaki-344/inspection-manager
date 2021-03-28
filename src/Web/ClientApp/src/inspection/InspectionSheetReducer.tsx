import React from 'react';
import { InspectionItem, InspectionSheet, InspectionSheetAction } from './Types';

export const TYPES = {
  SET_SHEET: 'SET_SHEET',
  UPDATE_FIELD: 'UPDATE_FIELD',
  ADD_EQUIPMENT: 'ADD_EQUIPMENT',
  REMOVE_EQUIPMENT: 'REMOVE_EQUIPMENT',
  UPDATE_EQUIPMENT: 'UPDATE_EQUIPMENT',
  ADD_INSPECTION_ITEM: 'ADD_INSPECTION_ITEM',
  REMOVE_INSPECTION_ITEM: 'REMOVE_INSPECTION_ITEM',
  UPDATE_INSPECTION_ITEM: 'UPDATE_INSPECTION_ITEM',
};

export default function InspectionSheetReducer(state: InspectionSheet, action: InspectionSheetAction): any {
  console.log(action);
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
          equipment_id: Math.random().toString(36).substr(2, 9),
          equipment_name: '',
          inspection_items: [],
        })
      };
    case TYPES.REMOVE_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.filter(e => e.equipment_id !== action.payload?.equipment_id),
      };
    case TYPES.UPDATE_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.map(e => {
          if (e.equipment_id === action.payload?.equipment_id &&
            action.payload?.name != null) {
            return {
              ...e,
              [action.payload.name]: action.payload.value,
            };
          } else {
            return e;
          }
        }),
      };
    case TYPES.ADD_INSPECTION_ITEM:
      return {
        ...state,
        equipments: state.equipments.map(e => {
          if (e.equipment_id === action.payload?.equipment_id && action.payload?.inspection_item != null) {
            return {
              ...e,
              inspection_items: e.inspection_items.concat(action.payload.inspection_item)
            };
          } else {
            return e;
          }
        }),
      };
    case TYPES.REMOVE_INSPECTION_ITEM:
      return {
        ...state,
        equipments: state.equipments.map(e => {
          if (e.equipment_id === action.payload?.equipment_id) {
            return {
              ...e,
              inspection_items: e.inspection_items.filter(i =>
                i.inspection_item_id !== action.payload?.inspection_item_id
              )
            };
          } else {
            return e;
          }
        }),
      };
    case TYPES.UPDATE_INSPECTION_ITEM:
      return {
        ...state,
        equipments: state.equipments.map(e => {
          if (e.equipment_id === action.payload?.equipment_id) {
            return {
              ...e,
              inspection_items: e.inspection_items.map(i => {
                if (i.inspection_item_id === action.payload?.inspection_item?.inspection_item_id) {
                  return action.payload?.inspection_item;
                } else {
                  return i;
                }
              }),
            };
          } else {
            return e;
          }
        }),
      };
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

export const removeEquipmentAction = (id: string): InspectionSheetAction => {
  return {
    type: TYPES.REMOVE_EQUIPMENT,
    payload: {
      equipment_id: id,
    }
  }
};

export const updateEquipmentAction = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_EQUIPMENT,
    payload: {
      name: event.target.name,
      value: event.target.value,
      equipment_id: id,
    },
  }
};

export const addInspectionItemAction = (id: string, item: InspectionItem): InspectionSheetAction => {
  return {
    type: TYPES.ADD_INSPECTION_ITEM,
    payload: {
      equipment_id: id,
      inspection_item: item,
    }
  }
};

export const removeInspectionItemAction = (id: string, itemId: string): InspectionSheetAction => {
  return {
    type: TYPES.REMOVE_INSPECTION_ITEM,
    payload: {
      equipment_id: id,
      inspection_item_id: itemId,
    }
  }
};

export const updateInspectionItemAction = (
  id: string,
  item: InspectionItem
): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_INSPECTION_ITEM,
    payload: {
      equipment_id: id,
      inspection_item: item,
    }
  }
};
