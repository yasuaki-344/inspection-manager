import React from "react";
import { Choice, InspectionItem, TYPES } from "../entities";
import { ChoiceTemplate } from "../typescript-fetch";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemInteractor implements IInspectionItemInteractor {
  readonly inspectionItem: InspectionItem;

  private readonly dispatch: React.Dispatch<any>;

  constructor(state: InspectionItem, dispatch: React.Dispatch<any>) {
    this.inspectionItem = state;
    this.dispatch = dispatch;
  }

  setItem(item: InspectionItem): void {
    this.dispatch({
      type: TYPES.SET_ITEM,
      payload: { item },
    });
  }

  updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    this.dispatch({
      type: TYPES.UPDATE_FIELD,
      payload: {
        name: event.target.name,
        value: event.target.value,
      },
    });
  }

  setChoices(choices: ChoiceTemplate): void {
    this.dispatch({
      type: TYPES.SET_CHOICE,
      payload: {
        choices
      },
    });
  }

  addChoice(): void {
    this.dispatch({
      type: TYPES.ADD_CHOICE,
    });
  }

  removeChoice(index: number): void {
    this.dispatch({
      type: TYPES.REMOVE_CHOICE,
      payload: {
        choice_index: index,
      },
    });
  }

  updateChoice(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void {
    this.dispatch({
      type: TYPES.UPDATE_CHOICE,
      payload: {
        value: event.target.value,
        choice_index: index,
      },
    });
  }

  /**
   * Checks if the given InspectionItem object is valid or not.
   * @returns Return true if the item is valid, otherwise false.
   */
  isValidInspectionItem(): boolean {
    if (this.inspectionItem.inspection_content === "") {
      return false;
    }

    if (this.inspectionItem.input_type === 3) {
      if (!this.inspectionItem.choices.length) {
        return false;
      } else {
        const descriptions = this.inspectionItem.choices.map(
          (x: Choice) => x.description
        );
        return !descriptions.includes("");
      }
    }
    return true;
  }
}
