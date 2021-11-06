import { InspectionType } from "../../entities";

export interface IInspectionTypePresenter {
  state: InspectionType[];
  editItem: InspectionType;

  getTypeName(id: number): string | undefined;
  inspectionTypeTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
