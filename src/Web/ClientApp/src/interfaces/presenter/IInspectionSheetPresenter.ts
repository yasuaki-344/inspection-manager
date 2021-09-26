import {
  InspectionSheet,
  InspectionGroup,
  InspectionType,
} from "../../entities";

export interface IInspectionSheetPresenter {
  readonly state: InspectionSheet;
  getAllInspectionSheet(): Promise<Array<InspectionSheet>>;
  getEditContent(
    isEdit: boolean,
    groups: Array<InspectionGroup>,
    types: Array<InspectionType>,
    handleAddItem: any,
    handleEditItem: any
  ): JSX.Element;
}
