import { InspectionGroup } from "../../entities";

export interface IInspectionGroupPresenter {
  readonly state: Array<InspectionGroup>;

  getById(id: number): InspectionGroup | undefined;
  getIds(keyword: string): Array<number>;
  getGroupName(id: number): string | undefined;
  inspectionGroupTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
