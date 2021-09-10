import React from 'react';
import {
  setItemAction, updateFieldAction, setChoiceAction,
  addChoiceAction, removeChoiceAction, updateChoiceAction
} from '../entities/InspectionItemReducer';
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
    this.dispatch(setItemAction(item));
  }

  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.dispatch(updateFieldAction(event));
  }

  setChoices(choices: ChoiceTemplate): void {
    this.dispatch(setChoiceAction(choices));
  }

  addChoice(): void {
    this.dispatch(addChoiceAction());
  }

  removeChoice(index: number): void {
    this.dispatch(removeChoiceAction(index));
  }

  updateChoice(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void {
    this.dispatch(updateChoiceAction(event, index))
  }
}
