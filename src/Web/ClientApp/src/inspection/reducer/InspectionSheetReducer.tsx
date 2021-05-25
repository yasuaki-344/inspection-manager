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
      return {
        ...state,
        equipments: state.equipments.map(e => {
          if (e.equipment_id === action.payload?.equipment_index && action.payload?.inspection_item != null) {
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
          if (e.equipment_id === action.payload?.equipment_index) {
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
          if (e.equipment_id === action.payload?.equipment_index) {
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
    case TYPES.SWAP_INSPECTION_ITEM: {
      const equipment = state.equipments.find(e => e.equipment_id === action.payload?.equipment_index);
      if (equipment == null) {
        return state;
      } else {
        const srcItem = equipment.inspection_items
          .find(x => x.inspection_item_id === action.payload?.inspection_item_id);
        const dstItem = equipment.inspection_items
          .find(x => x.inspection_item_id === action.payload?.swap_index);
        if (srcItem != null && dstItem != null) {
          return {
            ...state,
            equipments: state.equipments.map(e => {
              if (e.equipment_id === equipment.equipment_id) {
                return {
                  ...e,
                  inspection_items: e.inspection_items.map(i => {
                    if (i.inspection_item_id === srcItem.inspection_item_id) {
                      return {
                        ...dstItem,
                        inspection_item_id: i.inspection_item_id,
                      };
                    } else if (i.inspection_item_id === dstItem.inspection_item_id) {
                      return {
                        ...srcItem,
                        inspection_item_id: i.inspection_item_id,
                      }
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
        } else {
          return state;
        }
      }
    }
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

export const removeInspectionItemAction = (index: number, itemId: number): InspectionSheetAction => {
  return {
    type: TYPES.REMOVE_INSPECTION_ITEM,
    payload: {
      equipment_index: index,
      inspection_item_id: itemId,
    }
  }
};

export const updateInspectionItemAction = (
  index: number,
  item: InspectionItem
): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_INSPECTION_ITEM,
    payload: {
      equipment_index: index,
      inspection_item: item,
    }
  }
};

export const swapInspectionItemAction = (
  equipmentIndex: number,
  srcId: number,
  dstId: number
): InspectionSheetAction => {
  return {
    type: TYPES.SWAP_INSPECTION_ITEM,
    payload: {
      equipment_index: equipmentIndex,
      inspection_item_id: srcId,
      swap_index: dstId,
    }
  }
};
