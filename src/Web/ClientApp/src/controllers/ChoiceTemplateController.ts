import { IChoiceTemplateInteractor } from "../interfaces";

export class ChoiceTemplatePresenter {
  useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }
}