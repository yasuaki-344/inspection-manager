import React from 'react';
import { TYPES } from '../entities';
import { ChoiceTemplate } from '../typescript-fetch';
import { InspectionItem } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemInteractor implements IInspectionItemInteractor {
  private readonly state: any;
  private readonly dispatch: React.Dispatch<any>;

  constructor(state: any, dispatch: React.Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
  }

  getState(): InspectionItem {
    return this.state;
  }

  setItem(item: InspectionItem): void {
    this.dispatch({
      type: TYPES.SET_ITEM,
      payload: {
        item: item,
      },
    });
  }

  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
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
        choices: choices,
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
      }
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
      }
    });
  }

  /**
   * Checks if the given InspectionItem object is valid or not.
   * @param item InspectionItem object to check.
   * @returns Return true if the item is valid, otherwise false.
   */
  isValidInspectionItem(item: InspectionItem): boolean {
    if (item.inspection_content === '') {
      return false;
    }

    if (item.input_type === 3) {
      if (!item.choices.length) {
        return false;
      } else {
        const descriptions = item.choices.map(x => x.description);
        return !descriptions.includes('');
      }
    }
    return true;
  };
}
