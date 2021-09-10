import React from 'react';
import { TYPES } from '../entities';
import { ChoiceTemplate } from '../typescript-fetch';
import { InspectionItem } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemInteractor implements IInspectionItemInteractor {
  state: any;
  dispatch: React.Dispatch<any>;

  constructor(state: any, dispatch: React.Dispatch<any>) {
    this.state = state;
    this.dispatch = dispatch;
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
}
