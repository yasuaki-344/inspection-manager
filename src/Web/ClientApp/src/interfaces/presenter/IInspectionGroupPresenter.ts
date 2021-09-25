import { InspectionGroup } from "../../entities";

export interface IInspectionGroupPresenter {
  get(): void;
  getById(id: number): InspectionGroup | undefined;
  getByIds(keyword: string): Array<number>;
  getGroupName(id: number): string | undefined;
  inspectionGroupTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
