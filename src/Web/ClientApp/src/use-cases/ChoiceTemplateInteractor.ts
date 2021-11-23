import { Dispatch, SetStateAction, useState } from "react";
import {
  IChoiceTemplateInteractor,
  IChoiceTemplateRepository,
} from "../interfaces";
import { ChoiceTemplate } from "../entities";

export class ChoiceTemplateInteractor implements IChoiceTemplateInteractor {
  readonly templates: ChoiceTemplate[];

  private readonly dispatch: Dispatch<SetStateAction<ChoiceTemplate[]>>;

  private readonly repository: IChoiceTemplateRepository;

  /**
   * Initializes a new instance of ChoiceTemplateInteractor class.
   * @param repository Object implements IChoiceTemplateRepository interface.
   */
  constructor(repository: IChoiceTemplateRepository) {
    const [templates, setTemplates] = useState<ChoiceTemplate[]>([]);

    this.templates = templates;
    this.dispatch = setTemplates;
    this.repository = repository;
  }

  /** @inheritdoc */
  async fetchAllChoiceTemplates(): Promise<void> {
    this.repository
      .fetchAllChoiceTemplates()
      .then((res: ChoiceTemplate[]) => {
        this.dispatch(res);
      })
      .catch(console.error);
  }

  /** @inheritdoc */
  async create(choiceTemplate: ChoiceTemplate): Promise<void> {
    const res = await this.repository.post(choiceTemplate);
    this.dispatch(this.templates.concat(res));
  }

  /** @inheritdoc */
  async update(choiceTemplate: ChoiceTemplate): Promise<void> {
    const res = await this.repository.put(choiceTemplate);
    this.dispatch(
      this.templates.map((x) =>
        x.choiceTemplateId === res.choiceTemplateId ? res : x
      )
    );
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.dispatch(
      this.templates.filter((x: ChoiceTemplate) => x.choiceTemplateId !== id)
    );
  }
}
