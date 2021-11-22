import { ChoiceTemplate, InspectionItem, Option } from ".";
import { Choice } from "./Choice";

export type InspectionItemAction = {
  type: string;
  payload: {
    name?: string;
    value?: string;
    choiceOrderIndex?: number;
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

export const ITEM_ACTION_TYPES = {
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
    case ITEM_ACTION_TYPES.SET_ITEM: {
      const { item } = action.payload;
      if (item != null) {
        return item;
      }
      return state;
    }
    case ITEM_ACTION_TYPES.UPDATE_FIELD: {
      const { name, value } = action.payload;
      if (name != null && value != null) {
        if (name === "inputType" && value !== "2") {
          return { ...state, [name]: value, choices: [] };
        }
        return { ...state, [name]: value };
      }
      return state;
    }
    case ITEM_ACTION_TYPES.SET_CHOICE: {
      const { choices } = action.payload;
      if (choices != null) {
        const newChoices = choices.choices.map((x: Option, index: number) => {
          return {
            choiceId: 0,
            orderIndex: index + 1,
            description: x.description,
          };
        });
        return {
          ...state,
          choices: newChoices,
        };
      }
      return state;
    }
    case ITEM_ACTION_TYPES.ADD_CHOICE: {
      const { choices } = state;
      const maxOrderIndex = !choices.length
        ? 0
        : choices
            .map((o) => o.orderIndex)
            .reduce((previous, current) => Math.max(previous, current));
      return {
        ...state,
        choices: state.choices.concat({
          orderIndex: maxOrderIndex + 1,
          choiceId: 0,
          description: "",
        }),
      };
    }
    case ITEM_ACTION_TYPES.REMOVE_CHOICE: {
      const { choiceOrderIndex: choiceIndex } = action.payload;
      if (choiceIndex != null) {
        const choices = state.choices.filter(
          (x: Choice) => x.orderIndex !== choiceIndex
        );
        return { ...state, choices };
      }
      return state;
    }
    case ITEM_ACTION_TYPES.UPDATE_CHOICE: {
      const { choiceOrderIndex: choiceIndex, value } = action.payload;
      if (choiceIndex != null && value != null) {
        const { choices } = state;
        return {
          ...state,
          choices: choices.map((x: Choice) =>
            x.orderIndex !== choiceIndex
              ? x
              : {
                  ...x,
                  description: value,
                }
          ),
        };
      }
      return state;
    }
    default:
      console.warn(`unknown type ${action.type}`);
      return state;
  }
}
