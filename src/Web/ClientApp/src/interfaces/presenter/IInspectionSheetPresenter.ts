import {
  Equipment,
  InspectionGroup,
  InspectionItem,
  InspectionSheet,
  InspectionType,
} from "../../entities";

export interface IInspectionSheetPresenter {
  selectionSheets: InspectionSheet[];

  sheetId: number;

  sheetName: string;

  groupId: number;

  groups: InspectionGroup[];

  typeId: number;

  types: InspectionType[];

  equipments: Equipment[];

  item: InspectionItem;

  isValidInspectionItem(): boolean;

  getItemEditContent(onTemplateSelectClick: () => void): JSX.Element;
}
