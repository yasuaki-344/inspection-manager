import React from "react";
import { InspectionItem, ChoiceTemplate } from "../entities";

export interface IInspectionItemInteractor {
  inspectionItem: InspectionItem;
  setItem(item: InspectionItem): void;
  updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void;
  setChoices(choices: ChoiceTemplate): void;
  addChoice(): void;
  removeChoice(index: number): void;
  updateChoice(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void;
  isValidInspectionItem(): boolean;
}
