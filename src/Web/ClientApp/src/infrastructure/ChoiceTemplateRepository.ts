import { IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate, toCamelCase, toSnakeCase } from "../entities";
import {
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
    return toCamelCase(res);
  }

  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesPost({
      choiceTemplate: req,
    });
    return toCamelCase(res);
  }

  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesChoiceTemplateIdPut({
      choiceTemplateId: req.choice_template_id,
      choiceTemplate: req,
    });
    return toCamelCase(res);
  }

  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesChoiceTemplateIdDelete({
      choiceTemplateId: id,
    });
  }
}
