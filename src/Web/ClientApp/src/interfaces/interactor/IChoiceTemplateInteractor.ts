import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateInteractor {
  templates: ChoiceTemplate[];
  target: ChoiceTemplate;

  /**
   * Sets up new choice template to edit.
   */
  setUpNewChoiceTemplate(): void;

  /**
   * Adds new choice to editing template.
   */
  addChoice(): void;

  /**
   * Updates the specified choice of editing template.
   * @param index Index of choice to be update.
   * @param input Update string.
   */
  updateChoice(index: number, input: string): void;

  /**
   * Removes the specified choice from editing template
   * @param index Index of choice to be removed.
   */
  removeChoice(index: number): void;

  /**
   * Gets all choice templates from database.
   */
  fetchAllChoiceTemplates(): Promise<void>;

  /**
   * Creates a new choice templates by using the specified data.
   * @param choiceTemplate Template data to be created.
   */
  create(choiceTemplate: ChoiceTemplate): Promise<void>;

  /**
   * Updates a the specified templates
   * @param choiceTemplate Template data to be updated.
   */
  update(choiceTemplate: ChoiceTemplate): Promise<void>;

  /**
   * Removes the specified choice template from database.
   * @param id Choice template ID to be removed.
   */
  delete(id: number): Promise<void>;
}
