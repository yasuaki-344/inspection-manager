import { IChoiceTemplateInteractor } from "../interfaces";

export class ChoiceTemplateController {
  private readonly useCase: IChoiceTemplateInteractor

  constructor(useCase: IChoiceTemplateInteractor) {
    this.useCase = useCase
  }

  async delete(id:number): Promise<void>{
    await this.useCase.delete(id);
  }
}