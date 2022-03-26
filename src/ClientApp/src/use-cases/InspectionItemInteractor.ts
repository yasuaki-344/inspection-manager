import { Dispatch, useReducer } from "react";
import {
  InspectionItemAction,
  InspectionItemInitialState,
  InspectionItemReducer,
  ITEM_ACTION_TYPES,
} from "../entities";
import { IInspectionItemInteractor } from "../interfaces";
import { Choice, ChoiceTemplate, InspectionItem } from "../typescript-fetch";

export class InspectionItemInteractor implements IInspectionItemInteractor {
  readonly inspectionItem: InspectionItem;

  private readonly dispatch: Dispatch<InspectionItemAction>;

  /**
   * Initializes a new instance of InspectionItemInteractor class.
   */
  constructor() {
    const [state, dispatch] = useReducer(
      InspectionItemReducer,
      InspectionItemInitialState
    );
    this.inspectionItem = state;
    this.dispatch = dispatch;
  }

  setItem(item: InspectionItem): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.SET_ITEM,
      payload: { item },
    });
  }

  /** @inheritdoc */
  updateField(name: string, value: string): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.UPDATE_FIELD,
      payload: { name, value },
    });
  }

  setChoices(choices: ChoiceTemplate): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.SET_CHOICE,
      payload: {
        choices,
      },
    });
  }

  addChoice(): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.ADD_CHOICE,
      payload: {},
    });
  }

  removeChoice(index: number): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.REMOVE_CHOICE,
      payload: {
        choiceOrderIndex: index,
      },
    });
  }

  /** @inheritdoc */
  updateChoice(choiceOrderIndex: number, value: string): void {
    this.dispatch({
      type: ITEM_ACTION_TYPES.UPDATE_CHOICE,
      payload: { value, choiceOrderIndex },
    });
  }

  /**
   * Checks if the given InspectionItem object is valid or not.
   * @returns Return true if the item is valid, otherwise false.
   */
  isValidInspectionItem(): boolean {
    if (this.inspectionItem.inspectionContent === "") {
      return false;
    }

    if (this.inspectionItem.inputType === 3) {
      if (!this.inspectionItem.choices.length) {
        return false;
      }
      const descriptions = this.inspectionItem.choices.map(
        (x: Choice) => x.description
      );
      return !descriptions.includes("");
    }
    return true;
  }
}
