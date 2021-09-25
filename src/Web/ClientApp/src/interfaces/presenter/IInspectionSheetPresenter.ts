import {
  InspectionSheet,
  InspectionGroup,
  InspectionType,
} from "../../entities";

export interface IInspectionSheetPresenter {
  getAllInspectionSheet(): Promise<Array<InspectionSheet>>;
  getInspectionSheetById(id: number): Promise<void>;
  getState(): InspectionSheet;
  getEditContent(
    isEdit: boolean,
    groups: Array<InspectionGroup>,
    types: Array<InspectionType>,
    handleAddItem: any,
    handleEditItem: any
  ): JSX.Element;
}
