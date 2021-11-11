import { InspectionSheet } from "../../entities";

export interface ICreatePresenter {
  selectionSheets: InspectionSheet[];

  /**
   *
   * @param isEdit
   * @param handleAddItem
   * @param handleEditItem
   */
  getEditContent(
    isEdit: boolean,
    handleAddItem: any,
    handleEditItem: any
  ): JSX.Element;
}
