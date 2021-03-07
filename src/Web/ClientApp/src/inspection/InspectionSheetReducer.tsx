import { InspectionSheetAction } from './Types';

const TYPES = {
  UPDATE_FIELD: "UPDATE_FIELD",
};

export default function InspectionSheetReducer(state: any, action: InspectionSheetAction): any {
  console.log(action);
  switch (action.type) {
    case TYPES.UPDATE_FIELD:
      if (action.payload != null) {
        return { ...state, [action.payload.name]: action.payload.value };
      } else {
        return state;
      }
    default:
      return state;
  }
}

export const updateFieldAction = (event: any): InspectionSheetAction => {
  return {
    type: TYPES.UPDATE_FIELD,
    payload: {
      name: event.target.name,
      value: event.target.value,
    },
  }
};
