import { IChoiceTemplateInteractor } from "../interfaces";

export class ChoiceTemplatePresenter {
  private readonly useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }

  get(): void {
    this.useCase.get();
  }

}