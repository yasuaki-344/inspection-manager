import { Equipment, InspectionItem, InspectionSheet } from ".";

export type InspectionSheetAction = {
  type: string;
  payload: {
    sheet?: InspectionSheet;
    name?: string;
    numericValue?: number;
    stringValue?: string;
    equipmentOrderIndex?: number;
    itemOrderIndex?: number;
    srcOrderIndex?: number;
    dstOrderIndex?: number;
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
  SET_SHEET: "SET_SHEET",
  SET_STRING_FIELD: "SET_STRING_FIELD",
  SET_NUMERIC_FIELD: "SET_NUMERIC_FIELD",
  ADD_EQUIPMENT: "ADD_EQUIPMENT",
  REMOVE_EQUIPMENT: "REMOVE_EQUIPMENT",
  SWAP_EQUIPMENTS: "SWAP_EQUIPMENTS",
  SET_EQUIPMENT_STRING_FIELD: "SET_EQUIPMENT_STRING_FIELD",
  ADD_INSPECTION_ITEM: "ADD_INSPECTION_ITEM",
  REMOVE_INSPECTION_ITEM: "REMOVE_INSPECTION_ITEM",
  SWAP_INSPECTION_ITEMS: "SWAP_INSPECTION_ITEMS",
  UPDATE_INSPECTION_ITEM: "UPDATE_INSPECTION_ITEM",
};

export function InspectionSheetReducer(
  state: InspectionSheet,
  action: InspectionSheetAction
): InspectionSheet {
  switch (action.type) {
    case SHEET_ACTION_TYPE.SET_SHEET: {
      const { sheet } = action.payload;
      if (sheet != null) {
        return sheet;
      }
      return state;
    }
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
    case SHEET_ACTION_TYPE.ADD_INSPECTION_ITEM: {
      const { equipmentOrderIndex, inspectionItem } = action.payload;
      if (equipmentOrderIndex != null && inspectionItem != null) {
        const { equipments } = state;
        const equipment = equipments.find(
          (x: Equipment) => x.orderIndex === equipmentOrderIndex
        );
        if (equipment != null) {
          const { inspectionItems } = equipment;
          const maxOrderIndex = !inspectionItems.length
            ? 0
            : inspectionItems
                .map((o) => o.orderIndex)
                .reduce((previous, current) => Math.max(previous, current));
          equipment.inspectionItems = equipment.inspectionItems.concat({
            ...inspectionItem,
            orderIndex: maxOrderIndex + 1,
          });
          return {
            ...state,
            equipments: state.equipments.map((x: Equipment) => {
              if (x.orderIndex === equipmentOrderIndex) {
                return equipment;
              }
              return x;
            }),
          };
        }
        return state;
      }
      return state;
    }
    case SHEET_ACTION_TYPE.REMOVE_INSPECTION_ITEM: {
      const { equipmentOrderIndex, itemOrderIndex } = action.payload;
      if (equipmentOrderIndex != null && itemOrderIndex != null) {
        return {
          ...state,
          equipments: state.equipments.map((x: Equipment) => {
            if (x.orderIndex === equipmentOrderIndex) {
              return {
                ...x,
                inspectionItems: x.inspectionItems.filter(
                  (y: InspectionItem) => y.orderIndex !== itemOrderIndex
                ),
              };
            }
            return x;
          }),
        };
      }
      return state;
    }
    case SHEET_ACTION_TYPE.SWAP_INSPECTION_ITEMS: {
      const { equipmentOrderIndex, srcOrderIndex, dstOrderIndex } =
        action.payload;
      if (
        equipmentOrderIndex != null &&
        srcOrderIndex != null &&
        dstOrderIndex != null
      ) {
        const equipment = state.equipments.find(
          (x: Equipment) => x.orderIndex === equipmentOrderIndex
        );
        if (equipment != null) {
          const { inspectionItems } = equipment;
          const src = inspectionItems.find(
            (x: InspectionItem) => x.orderIndex === srcOrderIndex
          );
          const dst = inspectionItems.find(
            (x: InspectionItem) => x.orderIndex === dstOrderIndex
          );
          if (src != null && dst != null) {
            equipment.inspectionItems = inspectionItems.map(
              (x: InspectionItem) => {
                if (x.orderIndex === srcOrderIndex) {
                  return { ...dst, orderIndex: srcOrderIndex };
                }
                if (x.orderIndex === dstOrderIndex) {
                  return { ...src, orderIndex: dstOrderIndex };
                }
                return x;
              }
            );
            return {
              ...state,
              equipments: state.equipments.map((x: Equipment) =>
                x.orderIndex === equipmentOrderIndex ? equipment : x
              ),
            };
          }
        }
      }
      return state;
    }
    case SHEET_ACTION_TYPE.UPDATE_INSPECTION_ITEM: {
      const { equipmentOrderIndex, itemOrderIndex, inspectionItem } =
        action.payload;
      if (
        equipmentOrderIndex != null &&
        itemOrderIndex != null &&
        inspectionItem != null
      ) {
        const equipment = state.equipments.find(
          (x: Equipment) => x.orderIndex === equipmentOrderIndex
        );
        if (equipment != null) {
          equipment.inspectionItems = equipment.inspectionItems.map(
            (x: InspectionItem) =>
              x.orderIndex === itemOrderIndex ? inspectionItem : x
          );
          return {
            ...state,
            equipments: state.equipments.map((x: Equipment) =>
              x.orderIndex === equipmentOrderIndex ? equipment : x
            ),
          };
        }
      }
      return state;
    }
    default:
      throw new Error(`unknown type ${action.type}`);
  }
}
