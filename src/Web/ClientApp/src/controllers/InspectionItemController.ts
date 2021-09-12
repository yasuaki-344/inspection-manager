import { InspectionItem } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";
import { ChoiceTemplate } from "../typescript-fetch";

export class InspectionItemController {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }

  setItem(item: InspectionItem): void {
    this.useCase.setItem(item)
  }

  setChoices(choices: ChoiceTemplate): void {
    this.useCase.setChoices(choices)
  }

  isValidInspectionItem(item: InspectionItem): boolean {
    return this.useCase.isValidInspectionItem(item);
  };
}