import {
  IChoiceTemplateController,
  IChoiceTemplateInteractor,
  IInspectionItemInteractor,
} from "../interfaces";

export class ChoiceTemplateController implements IChoiceTemplateController {
  private readonly useCase: IChoiceTemplateInteractor;

  private readonly itemUseCase: IInspectionItemInteractor;

  /**
   * Initializes a new instance of ChoiceTemplateController class.
   * @param useCase Objects implements IChoiceTemplateInteractor interface.
   * @param itemUseCase Objects implements IInspectionItemInteractor interface.
   */
  constructor(
    useCase: IChoiceTemplateInteractor,
    itemUseCase: IInspectionItemInteractor
  ) {
    this.useCase = useCase;
    this.itemUseCase = itemUseCase;
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
  applyTemplate(index: number): void {
    const template = this.useCase.templates[index];
    if (template != null) {
      this.itemUseCase.setChoices(template);
    }
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
