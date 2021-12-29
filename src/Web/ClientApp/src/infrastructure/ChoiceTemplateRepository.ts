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
    const data = toCamelCase(res);
    return data.map((x: any) => this.addOrderIndex(x));
  }

  /** @inheritdoc */
  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesPost({
      choiceTemplate: req,
    });
    const data = toCamelCase(res);
    return this.addOrderIndex(data);
  }

  /** @inheritdoc */
  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const req = toSnakeCase(choiceTemplate);
    const res = await this.api.choiceTemplatesIdPut({
      id: req.id,
      choiceTemplate: req,
    });
    const data = toCamelCase(res);
    return this.addOrderIndex(data);
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesIdDelete({
      id,
    });
  }

  private addOrderIndex(template: any): ChoiceTemplate {
    return {
      ...template,
      choices: template.choices.map((x: any, index: number) => {
        return {
          ...x,
          orderIndex: index + 1,
        };
      }),
    };
  }
}
