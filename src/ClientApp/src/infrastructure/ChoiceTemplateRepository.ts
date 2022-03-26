import { IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate, ChoiceTemplatesApi } from "../typescript-fetch";

export class ChoiceTemplateRepository implements IChoiceTemplateRepository {
  private readonly api: ChoiceTemplatesApi;

  /**
   * Initializes a new instance of ChoiceTemplateRepository class.
   */
  constructor() {
    this.api = new ChoiceTemplatesApi();
  }

  /** @inheritdoc */
  async fetchAllChoiceTemplates(): Promise<ChoiceTemplate[]> {
    const res = await this.api.choiceTemplatesGet();
    return res;
  }

  /** @inheritdoc */
  async post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.choiceTemplatesPost({
      choiceTemplate,
    });
    return res;
  }

  /** @inheritdoc */
  async put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate> {
    const res = await this.api.choiceTemplatesIdPut({
      id: choiceTemplate.id,
      choiceTemplate,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.api.choiceTemplatesIdDelete({
      id,
    });
  }
}
