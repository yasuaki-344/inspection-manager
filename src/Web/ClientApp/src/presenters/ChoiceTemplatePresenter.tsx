import {
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplatePresenter implements IChoiceTemplatePresenter {
  private readonly useCase: IChoiceTemplateInteractor;

  readonly state: ChoiceTemplate[];

  /**
   * Initializes a new instance of ChoiceTemplatePresenter class.
   * @param useCase Object implements IChoiceTemplateInteractor interface/
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
    this.state = useCase.templates;
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.state.find((x) => x.choiceTemplateId === id);
  }

  getByIndex(index: number): ChoiceTemplate | undefined {
    return this.useCase.templates[index];
  }
}
