import { InspectionItem, ChoiceTemplate } from "../../entities";

export interface IInspectionItemController {
  setItem(item: InspectionItem): void;
  setChoices(choices: ChoiceTemplate): void;
}
