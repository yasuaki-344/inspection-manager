import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplatePresenter {
  state: ChoiceTemplate[];
  target: ChoiceTemplate;

  /**
   * Checks if editing template is valid or not.
   */
  isTargetValid(): boolean;

  getById(id: number): ChoiceTemplate | undefined;
  getByIndex(index: number): ChoiceTemplate | undefined;
}
