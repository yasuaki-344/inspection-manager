import { IChoiceTemplateInteractor } from "../interfaces";
import { ChoiceTemplate } from "../typescript-fetch";

export class ChoiceTemplateController {
  private readonly useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }

  async create(choiceTemplate: ChoiceTemplate): Promise<void> {
    await this.useCase.create(choiceTemplate);
  }

  async delete(id:number): Promise<void>{
    await this.useCase.delete(id);
  }
}