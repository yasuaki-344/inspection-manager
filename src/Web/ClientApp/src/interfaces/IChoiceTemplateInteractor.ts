import { ChoiceTemplate } from "../typescript-fetch";

export interface IChoiceTemplateRepository {
  get(): Promise<ChoiceTemplate[]>
  delete(id:number): Promise<void>
}