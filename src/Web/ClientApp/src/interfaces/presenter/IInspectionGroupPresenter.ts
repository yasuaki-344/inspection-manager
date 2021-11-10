import { InspectionGroup } from "../../entities";

export interface IInspectionGroupPresenter {
  readonly state: InspectionGroup[];
  readonly editItem: InspectionGroup;

  getGroupName(id: number): string | undefined;
  inspectionGroupTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
