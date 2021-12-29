import {
  IChoiceTemplateInteractor,
  IChoiceTemplatePresenter,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplatePresenter implements IChoiceTemplatePresenter {
  readonly state: ChoiceTemplate[];

  readonly target: ChoiceTemplate;

  private readonly useCase: IChoiceTemplateInteractor;

  /**
   * Initializes a new instance of ChoiceTemplatePresenter class.
   * @param useCase Object implements IChoiceTemplateInteractor interface/
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
    this.state = useCase.templates;
    this.target = useCase.target;
  }

  /** @inheritdoc */
  isTargetValid(): boolean {
    if (!this.target.choices.length) {
      return false;
    }
    const index = this.target.choices.findIndex((x) => x.description === "");
    return index === -1;
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.state.find((x) => x.id === id);
  }
}
