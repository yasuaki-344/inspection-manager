import { InspectionItem } from ".";
import { ChoiceTemplate } from "../typescript-fetch";

export type InspectionItemAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    choice_index?: number;
    choices?: ChoiceTemplate;
    item?: InspectionItem;
  };
};

/**
 * Initial state of InspectionItem object.
 */
export const InspectionItemInitialState: InspectionItem = {
  inspection_item_id: 0,
  inspection_content: "",
  input_type: 0,
  choices: [],
};

export const TYPES = {
  SET_ITEM: "SET_ITEM",
  UPDATE_FIELD: "UPDATE_FIELD",
  SET_CHOICE: "SET_CHOICE",
  ADD_CHOICE: "ADD_CHOICE",
  REMOVE_CHOICE: "REMOVE_CHOICE",
  UPDATE_CHOICE: "UPDATE_CHOICE",
};

export function InspectionItemReducer(
  state: InspectionItem,
  action: InspectionItemAction
): any {
  switch (action.type) {
    case TYPES.SET_ITEM:
      return action.payload?.item;
    case TYPES.UPDATE_FIELD:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.name != null && payload.value != null) {
          if (payload.name === "input_type" && payload.value !== "2") {
            return {
              ...state,
              [payload.name]: payload.value,
              choices: [],
            };
          } else {
            return {
              ...state,
              [payload.name]: payload.value,
            };
          }
        }
      }
      return state;
    case TYPES.SET_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choices != null) {
          return {
            ...state,
            choices: payload.choices.choices.map((x) => {
              return {
                choice_id: 0,
                description: x.description,
              };
            }),
          };
        }
      }
      return state;
    case TYPES.ADD_CHOICE:
      console.log("check");
      return {
        ...state,
        choices: state.choices.concat({
          choice_id: 0,
          description: "",
        }),
      };
    case TYPES.REMOVE_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choice_index != null) {
          state.choices.splice(payload.choice_index, 1);
          return { ...state };
        }
      }
      return state;
    case TYPES.UPDATE_CHOICE:
      if (action.payload != null) {
        const payload = action.payload;
        if (payload.choice_index != null && payload.value != null) {
          state.choices[payload.choice_index].description = payload.value;
          return { ...state };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}
