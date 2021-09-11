import { ChoiceTemplate } from "../typescript-fetch";

export interface IChoiceTemplateRepository {
  get(): Promise<ChoiceTemplate[]>
}