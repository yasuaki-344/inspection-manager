import { ChoiceTemplate } from "../typescript-fetch";

export interface IChoiceTemplateInteractor {
  getTemplates(): Array<ChoiceTemplate>
  get(): void
  getById(id: number): ChoiceTemplate | undefined
  create(choiceTemplate: ChoiceTemplate): Promise<void>
  update(choiceTemplate: ChoiceTemplate): Promise<void>
  delete(id: number): Promise<void>
}