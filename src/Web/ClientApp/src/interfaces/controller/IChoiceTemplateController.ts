import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplateController {
  /**
   * Sets up new choice template to edit.
   */
  setUpNewChoiceTemplate(): void;

  /**
   * Adds new choice to edit template.
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
  getAllChoiceTemplates(): Promise<void>;

  /**
   * Creates new choice template in database.
   */
  create(): Promise<void>;
  update(choiceTemplate: ChoiceTemplate): Promise<void>;

  /**
   * Removes the specified choice template from database.
   * @param id ID of choice template to be removed.
   */
  delete(id: number): Promise<void>;
}
