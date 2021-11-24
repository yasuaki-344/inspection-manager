import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplatePresenter {
  state: ChoiceTemplate[];
  target: ChoiceTemplate;

  getById(id: number): ChoiceTemplate | undefined;
  getByIndex(index: number): ChoiceTemplate | undefined;
}
