import {
  Equipment,
  InspectionItem,
  InspectionSheet,
} from "../typescript-fetch";

export type InspectionSheetActionType =
  | "setSheet"
  | "setMember"
  | "addEquipment"
  | "removeEquipment"
  | "swapEquipments"
  | "setEquipmentMember"
  | "addInspectionItem"
  | "removeInspectionItem"
  | "swapInspectionItems"
  | "updateInspectionItem";

export type InspectionSheetAction = {
  type: InspectionSheetActionType;
  payload: {
    name?: string;
    value?: number | string;
    equipmentOrderIndex?: number;
    itemOrderIndex?: number;
    srcOrderIndex?: number;
    dstOrderIndex?: number;
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
  equipments: [],
};

export function InspectionSheetReducer(
  state: InspectionSheet,
  action: InspectionSheetAction
): InspectionSheet {
  const { type, payload } = action;
  switch (type) {
    case "setSheet": {
      const { sheet } = payload;
      return sheet != null ? sheet : state;
    }
    case "setMember": {
      const { name, value } = payload;
      if (name != null && value != null) {
        return { ...state, [name]: value };
      }
      return state;
    }
    case "addEquipment": {
      const { equipments } = state;
      const maxOrderIndex = !equipments.length
        ? 0
        : equipments
            .map((o: Equipment) => o.orderIndex)
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
    case "removeEquipment": {
      const { equipmentOrderIndex } = payload;
      if (equipmentOrderIndex != null) {
        const { equipments } = state;
        const newArray = equipments.filter(
          (x: Equipment) => x.orderIndex !== equipmentOrderIndex
        );
        return { ...state, equipments: newArray };
      }
      return state;
    }
    case "swapEquipments": {
      const { srcOrderIndex, dstOrderIndex } = payload;
      if (srcOrderIndex != null && dstOrderIndex != null) {
        const { equipments } = state;
        const src = equipments.find((x) => x.orderIndex === srcOrderIndex);
        const dst = equipments.find((x) => x.orderIndex === dstOrderIndex);
        if (src != null && dst != null) {
          const newArray = equipments.map((x: Equipment) => {
            switch (x.orderIndex) {
              case srcOrderIndex:
                return { ...dst, orderIndex: srcOrderIndex };
              case dstOrderIndex:
                return { ...src, orderIndex: dstOrderIndex };
              default:
                return x;
            }
          });
          return { ...state, equipments: newArray };
        }
      }
      return state;
    }
    case "setEquipmentMember": {
      const { equipmentOrderIndex, name, value } = payload;
      if (equipmentOrderIndex != null && name != null && value != null) {
        const { equipments } = state;
        return {
          ...state,
          equipments: equipments.map((x: Equipment) =>
            x.orderIndex !== equipmentOrderIndex ? x : { ...x, [name]: value }
          ),
        };
      }
      return state;
    }
    case "addInspectionItem": {
      const { equipmentOrderIndex, inspectionItem } = payload;
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
            equipments: equipments.map((x: Equipment) =>
              x.orderIndex === equipmentOrderIndex ? equipment : x
            ),
          };
        }
        return state;
      }
      return state;
    }
    case "removeInspectionItem": {
      const { equipmentOrderIndex, itemOrderIndex } = payload;
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
    case "swapInspectionItems": {
      const { equipmentOrderIndex, srcOrderIndex, dstOrderIndex } = payload;
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
                switch (x.orderIndex) {
                  case srcOrderIndex:
                    return { ...dst, orderIndex: srcOrderIndex };
                  case dstOrderIndex:
                    return { ...src, orderIndex: dstOrderIndex };
                  default:
                    return x;
                }
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
    case "updateInspectionItem": {
      const { equipmentOrderIndex, itemOrderIndex, inspectionItem } = payload;
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
