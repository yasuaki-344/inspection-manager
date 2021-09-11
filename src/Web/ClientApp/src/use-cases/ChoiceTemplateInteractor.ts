import React from "react";
import { IChoiceTemplateInteractor, IChoiceTemplateRepository } from "../interfaces";
import { ChoiceTemplate } from "../typescript-fetch";

export class ChoiceTemplateInteractor implements IChoiceTemplateInteractor {
  private readonly state: Array<ChoiceTemplate>
  private readonly dispatch: React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>
  private readonly repository: IChoiceTemplateRepository

  constructor(
    state: Array<ChoiceTemplate>,
    dispatch: React.Dispatch<React.SetStateAction<Array<ChoiceTemplate>>>,
    repository: IChoiceTemplateRepository
  ) {
    this.state = state;
    this.dispatch = dispatch;
    this.repository = repository;
  }

  getTemplates(): Array<ChoiceTemplate> {
    return this.state;
  }

  get(): void {
    this.repository.get()
      .then(res => {
        this.dispatch(res)
      })
      .catch(console.error);
  }
}