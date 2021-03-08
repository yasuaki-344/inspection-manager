import React from 'react';
import { InspectionSheet, InspectionSheetAction } from './Types';

const TYPES = {
  UPDATE_FIELD: "UPDATE_FIELD",
  ADD_EQUIPMENT: "ADD_EQUIPMENT",
};

export default function InspectionSheetReducer(state: InspectionSheet, action: InspectionSheetAction): any {
  console.log(action);
  switch (action.type) {
    case TYPES.UPDATE_FIELD:
      if (action.payload != null) {
        return { ...state, [action.payload.name]: action.payload.value };
      } else {
        return state;
      }
    case TYPES.ADD_EQUIPMENT:
      return {
        ...state,
        equipments: [
          ...state.equipments,
          {
            equipment_id: "c",
            equipment_name: "",
          }
        ]
      };
    default:
      return state;
  }
}

export const updateFieldAction = (event: React.ChangeEvent<HTMLInputElement>): InspectionSheetAction => {
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
