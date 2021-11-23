import { IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate, toCamelCase, toSnakeCase } from "../entities";
import {
  ChoiceTemplatesApi,
  ChoiceTemplatesApiInterface,
} from "../typescript-fetch";

export class ChoiceTemplateRepository implements IChoiceTemplateRepository {
  private readonly api: ChoiceTemplatesApiInterface;

  /**
   * Initializes a new instance of ChoiceTemplateRepository class.
   */
  constructor() {
    this.api = new ChoiceTemplatesApi();
  }

  /** @inheritdoc */
  async fetchAllChoiceTemplates(): Promise<ChoiceTemplate[]> {
    const res = await this.api.choiceTemplatesGet();
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesPost({
      choiceTemplate: req,
    });
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesChoiceTemplateIdPut({
      choiceTemplateId: req.choice_template_id,
      choiceTemplate: req,
    });
    return toCamelCase(res);
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesChoiceTemplateIdDelete({
      choiceTemplateId: id,
    });
  }
}
