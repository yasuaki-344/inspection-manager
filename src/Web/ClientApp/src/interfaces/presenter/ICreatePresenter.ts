import { ChangeEvent } from "react";
import { InspectionSheet } from "../../entities";

export interface ICreatePresenter {
  selectionSheets: InspectionSheet[];

  /**
   * Returns JSX element for display sheet ID information.
   * @param isEdit Indicates if edit mode or not
   */
  sheetIdInformation(isEdit: boolean): JSX.Element;

  /**
   * Returns JSX element for sheet name input.
   * @param handleChange Event handler for input change.
   */
  sheetNameInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element;

  /**
   * Returns JSX element for inspection group input.
   * @param handleChange Event handler for input change.
   */
  groupIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element;

  /**
   * Returns JSX element for inspection type input.
   * @param handleChange Event handler for input change.
   */
  typeIdInput(
    handleChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ): JSX.Element;

  /**
   *
   * @param handleAddItem
   * @param handleEditItem
   */
  getEditContent(
    handleEditItem: any
  ): JSX.Element;
}
