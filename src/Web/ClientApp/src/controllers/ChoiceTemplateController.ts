import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplateController implements IChoiceTemplateController {
  private readonly useCase: IChoiceTemplateInteractor;

  /**
   * Initializes a new instance of ChoiceTemplateController class.
   * @param useCase Objects implements IChoiceTemplateInteractor interface.
   */
  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase;
  }

  /** @inheritdoc */
  async getAllChoiceTemplates(): Promise<void> {
    await this.useCase.fetchAllChoiceTemplates();
  }

  async create(choiceTemplate: ChoiceTemplate): Promise<void> {
    await this.useCase.create(choiceTemplate);
  }

  async update(choiceTemplate: ChoiceTemplate): Promise<void> {
    await this.useCase.update(choiceTemplate);
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
