import { Equipment, InspectionItem, InspectionSheet } from ".";

export type InspectionSheetAction = {
  type: string;
  payload: {
    name?: string;
    numericValue?: number;
    stringValue?: string;
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
  sheetId: 0,
  sheetName: "",
  inspectionGroupId: 0,
  inspectionTypeId: 0,
  inspectionGroup: "",
  inspectionType: "",
  equipments: [],
};

export const SHEET_ACTION_TYPE = {
  SET_STRING_FIELD: "SET_STRING_FIELD",
  SET_NUMERIC_FIELD: "SET_NUMERIC_FIELD",
  ADD_EQUIPMENT: "ADD_EQUIPMENT",
  REMOVE_EQUIPMENT: "REMOVE_EQUIPMENT",

  SET_SHEET: "SET_SHEET",
  UPDATE_NUMERIC_FIELD: "UPDATE_NUMERIC_FIELD",
  UPDATE_FIELD: "UPDATE_FIELD",
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
    case SHEET_ACTION_TYPE.SET_STRING_FIELD: {
      const { name, stringValue } = action.payload;
      if (name != null && stringValue != null) {
        return {
          ...state,
          [name]: stringValue,
        };
      }
      return state;
    }
    case SHEET_ACTION_TYPE.SET_NUMERIC_FIELD: {
      const { name, numericValue } = action.payload;
      if (name != null && numericValue != null) {
        return {
          ...state,
          [name]: numericValue,
        };
      }
      return state;
    }
    case SHEET_ACTION_TYPE.ADD_EQUIPMENT: {
      const { equipments } = state;
      const maxOrderIndex = !equipments.length
        ? 0
        : equipments
            .map((o) => o.orderIndex)
            .reduce((previous, current) => Math.max(previous, current));

      const newEquipment: Equipment = {
        equipmentId: 0,
        orderIndex: maxOrderIndex + 1,
        equipmentName: "",
        inspectionItems: [],
      };
      return {
        ...state,
        equipments: equipments.concat(newEquipment),
      };
    }
    case SHEET_ACTION_TYPE.REMOVE_EQUIPMENT: {
      const { numericValue } = action.payload;
      if (numericValue != null) {
        return {
          ...state,
          equipments: state.equipments.filter(
            (x: Equipment) => x.orderIndex !== numericValue
          ),
        };
      }
      return state;
    }

    case SHEET_ACTION_TYPE.SET_SHEET:
      if (action.payload?.sheet != null) {
        return action.payload.sheet;
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_NUMERIC_FIELD: {
      const { payload } = action;
      if (payload.name != null && payload.numericValue != null) {
        return {
          ...state,
          [payload.name]: payload.numericValue,
        };
      }
      return state;
    }
    case SHEET_ACTION_TYPE.UPDATE_FIELD:
      if (action.payload?.name != null) {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }
      return state;
    case SHEET_ACTION_TYPE.UPDATE_EQUIPMENT: {
      const equipmentIndex = action.payload?.equipmentIndex ?? -1;
      const targetName = action.payload?.name ?? "";
      return {
        ...state,
        equipments: state.equipments.map((value: Equipment, index: number) => {
          if (index === equipmentIndex) {
            return {
              ...value,
              [targetName]: action.payload?.value,
            };
          }
          return value;
        }),
      };
    }
    case SHEET_ACTION_TYPE.SWAP_EQUIPMENT: {
      const srcIndex = action.payload?.equipmentIndex ?? -1;
      const dstIndex = action.payload?.swapIndex ?? -1;
      if (srcIndex >= 0 && dstIndex >= 0) {
        const { equipments } = state;
        [equipments[srcIndex], equipments[dstIndex]] = [
          equipments[dstIndex],
          equipments[srcIndex],
        ];
        return {
          ...state,
          equipments,
        };
      }
      return state;
    }
    case SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM:
      if (action.payload != null) {
        if (
          action.payload.equipmentIndex != null &&
          action.payload.inspectionItem != null
        ) {
          state.equipments[action.payload.equipmentIndex].inspectionItems.push(
            action.payload.inspectionItem
          );
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
          ].inspectionItems.splice(action.payload.inspectionItemIndex, 1);
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
          const { equipments } = state;
          equipments[action.payload.equipmentIndex].inspectionItems[
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
          const { equipments } = state;

          [
            equipments[action.payload.equipmentIndex].inspectionItems[
              action.payload.inspectionItemIndex
            ],
            equipments[action.payload.equipmentIndex].inspectionItems[
              action.payload.swapIndex
            ],
          ] = [
            equipments[action.payload.equipmentIndex].inspectionItems[
              action.payload.swapIndex
            ],
            equipments[action.payload.equipmentIndex].inspectionItems[
              action.payload.inspectionItemIndex
            ],
          ];
          return { ...state, equipments };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}
