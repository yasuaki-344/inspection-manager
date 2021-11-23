import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplatePresenter {
  state: ChoiceTemplate[];

  getById(id: number): ChoiceTemplate | undefined;
  getByIndex(index: number): ChoiceTemplate | undefined;
}
