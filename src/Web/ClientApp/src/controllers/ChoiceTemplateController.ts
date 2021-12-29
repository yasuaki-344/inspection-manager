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
}
