import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateController {
  /**
   * Gets all choice templates from database.
   */
  getAllChoiceTemplates(): Promise<void>;
  create(choiceTemplate: ChoiceTemplate): Promise<void>;
  update(choiceTemplate: ChoiceTemplate): Promise<void>;
  delete(id: number): Promise<void>;
}
