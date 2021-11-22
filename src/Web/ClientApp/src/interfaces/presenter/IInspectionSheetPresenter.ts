import { ChangeEvent } from "react";
import { InspectionItem, InspectionSheet } from "../../entities";

export interface IInspectionSheetPresenter {
  selectionSheets: InspectionSheet[];

  item: InspectionItem;

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
   */
  getEditContent(): JSX.Element;

  isValidInspectionItem(): boolean;

  getItemEditContent(onTemplateSelectClick: () => void): JSX.Element;
}
