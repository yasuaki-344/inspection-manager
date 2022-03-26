import { IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate, ChoiceTemplateApi } from "../typescript-fetch";

export class ChoiceTemplateRepository implements IChoiceTemplateRepository {
  private readonly api: ChoiceTemplateApi;

  /**
   * Initializes a new instance of ChoiceTemplateRepository class.
   */
  constructor() {
    this.api = new ChoiceTemplateApi();
  }

  /** @inheritdoc */
  async fetchAllChoiceTemplates(): Promise<ChoiceTemplate[]> {
    const res = await this.api.apiV1ChoiceTemplatesGet();
    return res;
  }

  /** @inheritdoc */
  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.apiV1ChoiceTemplatesPost({
      choiceTemplate,
    });
    return res;
  }

  /** @inheritdoc */
  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.apiV1ChoiceTemplatesIdPut({
      id: choiceTemplate.id,
      choiceTemplate,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.apiV1ChoiceTemplatesIdDelete({
      id,
    });
  }
}
