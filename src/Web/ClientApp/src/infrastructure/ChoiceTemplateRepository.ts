import { IChoiceTemplateRepository } from "../interfaces";
import {
  ChoiceTemplate,
  ChoiceTemplatesApi,
  ChoiceTemplatesApiInterface,
} from "../typescript-fetch";

export class ChoiceTemplateRepository implements IChoiceTemplateRepository {
  private readonly api: ChoiceTemplatesApiInterface;

  constructor() {
    this.api = new ChoiceTemplatesApi();
  }

  async get(): Promise<ChoiceTemplate[]> {
    const res = await this.api.choiceTemplatesGet();
    return res;
  }

  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.choiceTemplatesPost({
      choiceTemplate,
    });
    return res;
  }

  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.choiceTemplatesChoiceTemplateIdPut({
      choiceTemplateId: choiceTemplate.choice_template_id,
      choiceTemplate,
    });
    return res;
  }

  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesChoiceTemplateIdDelete({
      choiceTemplateId: id,
    });
  }
}
