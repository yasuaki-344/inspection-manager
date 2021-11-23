import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateRepository {
  /**
   * Gets all choice templates from database.
   */
  fetchAllChoiceTemplates(): Promise<ChoiceTemplate[]>;

  /**
   * Creates a new choice templates by using the specified data.
   * @param choiceTemplate Template data to be created.
   */
  post(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate>;

  /**
   * Updates a the specified templates
   * @param choiceTemplate Template data to be updated.
   */
  put(choiceTemplate: ChoiceTemplate): Promise<ChoiceTemplate>;

  /**
   * Removes the specified choice template from database.
   * @param id Choice template ID to be removed.
   */
  delete(id: number): Promise<void>;
}
