import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateController {
  /**
   * Gets all choice templates from database.
   */
  getAllChoiceTemplates(): Promise<void>;
  create(choiceTemplate: ChoiceTemplate): Promise<void>;
  update(choiceTemplate: ChoiceTemplate): Promise<void>;

  /**
   * Removes the specified choice template from database.
   * @param id ID of choice template to be removed.
   */
  delete(id: number): Promise<void>;
}
