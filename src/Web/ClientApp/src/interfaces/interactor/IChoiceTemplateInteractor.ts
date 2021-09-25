import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateRepository {
  get(): Promise<ChoiceTemplate[]>;
  post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate>;
  put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate>;
  delete(id: number): Promise<void>;
}
