import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateController {
  create(choiceTemplate: ChoiceTemplate): Promise<void>;
  update(choiceTemplate: ChoiceTemplate): Promise<void>;
  delete(id: number): Promise<void>;
}
