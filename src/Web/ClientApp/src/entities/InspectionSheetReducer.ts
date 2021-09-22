import { InspectionItem, InspectionSheet } from ".";

export type InspectionSheetAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    equipmentIndex?: number;
    // eslint-disable-next-line
    inspection_item_index?: number;
    // eslint-disable-next-line
    swapIndex?: number;
    sheet?: InspectionSheet;
    // eslint-disable-next-line
    inspection_item?: InspectionItem;
  };
};

/**
 * Initial state of InspectionSheet object.
 */
export const InspectionSheetInitialState: InspectionSheet = {
  sheet_id: 0,
  sheet_name: "",
  inspection_group_id: 0,
  inspection_type_id: 0,
  inspection_group: "",
  inspection_type: "",
  equipments: [],
};

export const SHEET_ACTION_TYPE = {
  SET_SHEET: "SET_SHEET",
  UPDATE_FIELD: "UPDATE_FIELD",
  ADD_EQUIPMENT: "ADD_EQUIPMENT",
  REMOVE_EQUIPMENT: "REMOVE_EQUIPMENT",
  UPDATE_EQUIPMENT: "UPDATE_EQUIPMENT",
  SWAP_EQUIPMENT: "SWAP_EQUIPMENT",
  ADD_INSPECTION_ITEM: "ADD_INSPECTION_ITEM",
  REMOVE_INSPECTION_ITEM: "REMOVE_INSPECTION_ITEM",
  UPDATE_INSPECTION_ITEM: "UPDATE_INSPECTION_ITEM",
  SWAP_INSPECTION_ITEM: "SWAP_INSPECTION_ITEM",
};

export function InspectionSheetReducer(
  state: InspectionSheet,
  action: InspectionSheetAction
): any {
  switch (action.type) {
    case SHEET_ACTION_TYPE.SET_SHEET:
      return action.payload?.sheet;
    case SHEET_ACTION_TYPE.UPDATE_FIELD:
      if (action.payload?.name != null) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
      return state;
    case SHEET_ACTION_TYPE.ADD_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.concat({
          equipment_id: 0,
          equipment_name: "",
          inspection_items: [],
        }),
      };
    case SHEET_ACTION_TYPE.REMOVE_EQUIPMENT:
      if (action.payload != null) {
        if (action.payload.equipmentIndex != null) {
          state.equipments.splice(action.payload.equipmentIndex, 1);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_EQUIPMENT:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.name != null
        ) {
          // eslint-disable-next-line
          state.equipments[action.payload.equipmentIndex] = {
            ...state.equipments[action.payload.equipmentIndex],
            [action.payload.name]: action.payload.value,
          };
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.SWAP_EQUIPMENT:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.swapIndex != null
        ) {
          [
            // eslint-disable-next-line
            state.equipments[action.payload.equipmentIndex],
            // eslint-disable-next-line
            state.equipments[action.payload.swapIndex],
          ] = [
            state.equipments[action.payload.swapIndex],
            state.equipments[action.payload.equipmentIndex],
          ];
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspection_item != null
        ) {
          state.equipments[
            action.payload.equipmentIndex
          ].inspection_items.push(action.payload.inspection_item);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspection_item_index != null
        ) {
          state.equipments[
            action.payload.equipmentIndex
          ].inspection_items.splice(action.payload.inspection_item_index, 1);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspection_item_index != null &&
          action.payload.inspection_item != null
        ) {
          // eslint-disable-next-line
          state.equipments[action.payload.equipmentIndex].inspection_items[
            action.payload.inspection_item_index
          ] = action.payload.inspection_item;
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspection_item_index != null &&
          action.payload.swapIndex != null
        ) {
          [
            // eslint-disable-next-line
            state.equipments[action.payload.equipmentIndex].inspection_items[
              action.payload.inspection_item_index
            ],
            // eslint-disable-next-line
            state.equipments[action.payload.equipmentIndex].inspection_items[
              action.payload.swapIndex
            ],
          ] = [
            state.equipments[action.payload.equipmentIndex].inspection_items[
              action.payload.swapIndex
            ],
            state.equipments[action.payload.equipmentIndex].inspection_items[
              action.payload.equipmentIndex
            ],
          ];
          return { ...state };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}
