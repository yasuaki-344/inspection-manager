import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
} from "../interfaces";

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
  setUpNewChoiceTemplate(): void {
    this.useCase.setUpNewChoiceTemplate();
  }

  /** @inheritdoc */
  setUpChoiceTemplateForEdit(id: number): void {
    this.useCase.setUpChoiceTemplateForEdit(id);
  }

  /** @inheritdoc */
  addChoice(): void {
    this.useCase.addChoice();
  }

  /** @inheritdoc */
  updateChoice(index: number, input: string): void {
    this.useCase.updateChoice(index, input);
  }

  /** @inheritdoc */
  removeChoice(index: number): void {
    this.useCase.removeChoice(index);
  }

  /** @inheritdoc */
  async getAllChoiceTemplates(): Promise<void> {
    await this.useCase.fetchAllChoiceTemplates();
  }

  /** @inheritdoc */
  async create(): Promise<void> {
    await this.useCase.create();
  }

  /** @inheritdoc */
  async update(): Promise<void> {
    await this.useCase.update();
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
