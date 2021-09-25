import { InspectionItem, ChoiceTemplate } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemController {
  private readonly useCase: IInspectionItemInteractor;

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase;
  }

  initialize(): void {
    this.useCase.setItem({
      inspectionItemId: 0,
      inspectionContent: "",
      inputType: 1,
      choices: [],
    });
  }

  setItem(item: InspectionItem): void {
    this.useCase.setItem(item);
  }

  setChoices(choices: ChoiceTemplate): void {
    this.useCase.setChoices(choices);
  }
}
