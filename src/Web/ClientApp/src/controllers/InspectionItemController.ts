import { InspectionItem, ChoiceTemplate } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemController {
  private readonly useCase: IInspectionItemInteractor;

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase;
  }

  initialize(): void {
    this.useCase.setItem({
      inspection_item_id: 0,
      inspection_content: "",
      input_type: 1,
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
