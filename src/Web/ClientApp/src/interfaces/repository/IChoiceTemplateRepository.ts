import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateInteractor {
  templates: Array<ChoiceTemplate>;
  get(): void;
  getById(id: number): ChoiceTemplate | undefined;
  create(choiceTemplate: ChoiceTemplate): Promise<void>;
  update(choiceTemplate: ChoiceTemplate): Promise<void>;
  delete(id: number): Promise<void>;
}
