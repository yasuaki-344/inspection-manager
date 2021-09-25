import React from "react";
import { Choice, ChoiceTemplate, InspectionItem, TYPES } from "../entities";
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
        choices,
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
        choiceIndex: index,
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
        choiceIndex: index,
      },
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
