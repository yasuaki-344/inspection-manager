import { Equipment, InspectionItem, InspectionSheet } from ".";

export type InspectionSheetAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    equipmentIndex?: number;
    inspectionItemIndex?: number;
    swapIndex?: number;
    sheet?: InspectionSheet;
    inspectionItem?: InspectionItem;
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
): InspectionSheet {
  switch (action.type) {
    case SHEET_ACTION_TYPE.SET_SHEET:
      if (action.payload?.sheet != null) {
        return action.payload.sheet;
      }
      return state;
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
      {
        const equipmentIndex = action.payload?.equipmentIndex ?? -1;
        const targetName = action.payload?.name ?? "";
        return {
          ...state,
          equipments: state.equipments.map((value: Equipment, index: number) => {
            if (index === equipmentIndex) {
              return {
                ...value,
                [targetName]: action.payload?.value,
              }
            }
            return value
          })
        };
      }
    case SHEET_ACTION_TYPE.SWAP_EQUIPMENT: {
      const srcIndex = action.payload?.equipmentIndex ?? -1
      const dstIndex = action.payload?.swapIndex ?? -1
      if (srcIndex >= 0 && dstIndex >= 0) {
        const { equipments } = state;
        [ equipments[srcIndex], equipments[dstIndex],] =
        [ equipments[dstIndex], equipments[srcIndex],];
        return {
          ...state,
          equipments
        }
      }
      return state
      }
    case SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspectionItem != null
        ) {
          state.equipments[
            action.payload.equipmentIndex
          ].inspection_items.push(action.payload.inspectionItem);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspectionItemIndex != null
        ) {
          state.equipments[
            action.payload.equipmentIndex
          ].inspection_items.splice(action.payload.inspectionItemIndex, 1);
          return { ...state };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspectionItemIndex != null &&
          action.payload.inspectionItem != null
        ) {
          const {equipments} = state;
          equipments[action.payload.equipmentIndex].inspection_items[
            action.payload.inspectionItemIndex
          ] = action.payload.inspectionItem;
          return { ...state, equipments };
        }
      }
      return state;
    case SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspectionItemIndex != null &&
          action.payload.swapIndex != null
        ) {
          [
            // eslint-disable-next-line
            state.equipments[action.payload.equipmentIndex].inspection_items[
            action.payload.inspectionItemIndex
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
              action.payload.inspectionItemIndex
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
