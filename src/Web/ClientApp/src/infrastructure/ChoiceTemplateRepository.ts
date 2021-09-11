import { IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate, ChoiceTemplatesApi, ChoiceTemplatesApiInterface } from "../typescript-fetch";

export class ChoiceTemplateRepository implements IChoiceTemplateRepository {
  private readonly api: ChoiceTemplatesApiInterface

  constructor() {
    this.api = new ChoiceTemplatesApi();
  }

  async get(): Promise<ChoiceTemplate[]> {
    return await this.api.choiceTemplatesGet();
  }

  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesChoiceTemplateIdDelete({
      'choiceTemplateId': id
    })
  }
}