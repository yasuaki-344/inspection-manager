import { InspectionItem, ChoiceTemplate } from "../../entities";

export interface IInspectionItemController {
  initialize(): void;
  setItem(item: InspectionItem): void;
  setChoices(choices: ChoiceTemplate): void;
}
