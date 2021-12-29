import {
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplatePresenter implements IChoiceTemplatePresenter {
  readonly state: ChoiceTemplate[];

  /**
   * Initializes a new instance of ChoiceTemplatePresenter class.
   * @param useCase Object implements IChoiceTemplateInteractor interface/
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.state = useCase.templates;
  }
}
