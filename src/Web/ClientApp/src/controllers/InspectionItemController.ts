import { InspectionItem } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";
import { ChoiceTemplate } from "../typescript-fetch";

export class InspectionItemController {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }

  getState(): InspectionItem {
    return this.useCase.getState();
  }

  setItem(item: InspectionItem): void {
    this.useCase.setItem(item)
  }

  updateField(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.useCase.updateField(event);
  }

  setChoices(choices: ChoiceTemplate): void {
    this.useCase.setChoices(choices)
  }

  addChoice(): void {
    this.useCase.addChoice()
  }

  removeChoice(index: number): void {
    this.useCase.removeChoice(index)
  }

  updateChoice(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ): void {
    this.useCase.updateChoice(event, index);
  }

  isValidInspectionItem(item: InspectionItem): boolean {
    return this.useCase.isValidInspectionItem(item);
  };
}