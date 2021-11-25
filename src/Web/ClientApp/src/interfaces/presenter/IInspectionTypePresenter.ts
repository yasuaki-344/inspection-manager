import { InspectionType } from "../../entities";

export interface IInspectionTypePresenter {
  state: InspectionType[];
  editItem: InspectionType;

  getTypeName(id: number): string | undefined;
}
