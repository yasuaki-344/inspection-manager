import { ChoiceTemplate, InspectionItem } from ".";

export type InspectionItemAction = {
  type: string;
  payload?: {
    name?: string;
    value?: string;
    choiceIndex?: number;
    choices?: ChoiceTemplate;
    item?: InspectionItem;
  };
};

/**
 * Initial state of InspectionItem object.
 */
export const InspectionItemInitialState: InspectionItem = {
  inspectionItemId: 0,
  orderIndex: 0,
  inspectionContent: "",
  inputType: 0,
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
        if (action.payload.name != null && action.payload.value != null) {
          if (
            action.payload.name === "inputType" &&
            action.payload.value !== "2"
          ) {
            return {
              ...state,
              [action.payload.name]: action.payload.value,
              choices: [],
            };
          }
          return {
            ...state,
            [action.payload.name]: action.payload.value,
          };
        }
      }
      return state;
    case TYPES.SET_CHOICE:
      if (action.payload != null) {
        if (action.payload.choices != null) {
          return {
            ...state,
            choices: action.payload.choices.choices.map((x) => {
              return {
                choiceId: 0,
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
          orderIndex: 0,
          choiceId: 0,
          description: "",
        }),
      };
    case TYPES.REMOVE_CHOICE:
      if (action.payload != null) {
        if (action.payload.choiceIndex != null) {
          state.choices.splice(action.payload.choiceIndex, 1);
          return { ...state };
        }
      }
      return state;
    case TYPES.UPDATE_CHOICE:
      if (action.payload != null) {
        if (
          action.payload.choiceIndex != null &&
          action.payload.value != null
        ) {
          const { choices } = state;
          choices[action.payload.choiceIndex].description =
            action.payload.value;
          return { ...state, choices };
        }
      }
      return state;
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}
