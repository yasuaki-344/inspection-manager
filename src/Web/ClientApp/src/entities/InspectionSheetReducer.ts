import { Equipment, InspectionItem, InspectionSheet } from ".";

export type InspectionSheetAction = {
  type: string;
  payload: {
    name?: string;
    numericValue?: number;
    stringValue?: string;
    equipmentOrderIndex?: number;
    srcOrderIndex?: number;
    dstOrderIndex?: number;

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
  SWAP_EQUIPMENTS: "SWAP_EQUIPMENTS",
  SET_EQUIPMENT_STRING_FIELD: "SET_EQUIPMENT_STRING_FIELD",

  SET_SHEET: "SET_SHEET",
  UPDATE_NUMERIC_FIELD: "UPDATE_NUMERIC_FIELD",
  UPDATE_FIELD: "UPDATE_FIELD",
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
    case SHEET_ACTION_TYPE.SWAP_EQUIPMENTS: {
      const { srcOrderIndex, dstOrderIndex } = action.payload;
      if (srcOrderIndex != null && dstOrderIndex != null) {
        let { equipments } = state;
        const src = equipments.find(
          (x: Equipment) => x.orderIndex === srcOrderIndex
        );
        const dst = equipments.find(
          (x: Equipment) => x.orderIndex === dstOrderIndex
        );
        if (src != null && dst != null) {
          equipments = equipments.map((x: Equipment) => {
            if (x.orderIndex === srcOrderIndex) {
              return { ...dst, orderIndex: srcOrderIndex };
            }
            if (x.orderIndex === dstOrderIndex) {
              return { ...src, orderIndex: dstOrderIndex };
            }
            return x;
          });
          return {
            ...state,
            equipments,
          };
        }
      }
      return state;
    }
    case SHEET_ACTION_TYPE.SET_EQUIPMENT_STRING_FIELD: {
      const { equipmentOrderIndex, name, stringValue } = action.payload;
      if (equipmentOrderIndex != null && name != null && stringValue != null) {
        const { equipments } = state;
        return {
          ...state,
          equipments: equipments.map((x: Equipment) =>
            x.orderIndex !== equipmentOrderIndex
              ? x
              : {
                  ...x,
                  [name]: stringValue,
                }
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
