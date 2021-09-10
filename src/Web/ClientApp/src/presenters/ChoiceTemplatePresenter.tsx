import { IChoiceTemplateInteractor } from "../interfaces";

export class ChoiceTemplateController {
  useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }
}