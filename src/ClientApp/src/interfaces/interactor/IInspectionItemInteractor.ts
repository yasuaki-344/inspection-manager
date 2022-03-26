import { ChoiceTemplate } from "../../entities";
import { InspectionItem } from "../../typescript-fetch";

export interface IInspectionItemInteractor {
  inspectionItem: InspectionItem;
  setItem(item: InspectionItem): void;
  /**
   * Updates the specified inspection item field.
   * @param name Inspection item field name.
   * @param value Filed value to be set.
   */
  updateField(name: string, value: string): void;
  setChoices(choices: ChoiceTemplate): void;
  addChoice(): void;
  removeChoice(index: number): void;

  /**
   * Update the specified choice field.
   * @param choiceOrderIndex Order index of choice to be update
   * @param value Update value.
   */
  updateChoice(choiceOrderIndex: number, value: string): void;

  isValidInspectionItem(): boolean;
}
