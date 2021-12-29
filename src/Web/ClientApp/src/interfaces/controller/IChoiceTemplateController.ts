export interface IChoiceTemplateController {
  /**
   * Applies choice template to the editing inspection item.
   * @param index The index of choice template to be applied.
   */
  applyTemplate(index: number): void;

  /**
   * Gets all choice templates from database.
   */
  getAllChoiceTemplates(): Promise<void>;
}
