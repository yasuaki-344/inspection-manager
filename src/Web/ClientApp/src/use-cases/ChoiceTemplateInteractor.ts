import React from "react";
import { IChoiceTemplateInteractor, IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate } from "../typescript-fetch";

export class ChoiceTemplateInteractor implements IChoiceTemplateInteractor {
  readonly templates: Array<ChoiceTemplate>
  private readonly dispatch: React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>
  private readonly repository: IChoiceTemplateRepository

  constructor(
    templates: Array<ChoiceTemplate>,
    dispatch: React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>,
    repository: IChoiceTemplateRepository
  ) {
    this.templates = templates;
    this.dispatch = dispatch;
    this.repository = repository;
  }

  getTemplates(): Array<ChoiceTemplate> {
    return this.templates;
  }

  get(): void {
    this.repository.get()
      .then(res => {
        this.dispatch(res)
      })
      .catch(console.error);
  }

  getById(id: number): ChoiceTemplate | undefined {
    return this.templates.find((x: ChoiceTemplate) => x.choice_template_id === id);
  }

  async create(choiceTemplate: ChoiceTemplate): Promise<void> {
    const res = await this.repository.post(choiceTemplate);
    this.dispatch(this.templates.concat(res));
  }

  async update(choiceTemplate: ChoiceTemplate): Promise<void> {
    const res = await this.repository.put(choiceTemplate);
    this.dispatch(this.templates.map(x =>
      (x.choice_template_id === res.choice_template_id) ? res : x
    ));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.dispatch(this.templates.filter((x: ChoiceTemplate) =>
      x.choice_template_id !== id));
  }
}