import { ChoiceTemplate } from "../typescript-fetch";

export interface IChoiceTemplateInteractor {
  getTemplates(): Array<ChoiceTemplate>
  get(): void
  getById(id: number): ChoiceTemplate | undefined
}