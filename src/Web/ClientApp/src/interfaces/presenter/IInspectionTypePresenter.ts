import { InspectionType } from "../../entities";

export interface IInspectionTypePresenter {
  get(): void;
  getById(id: number): InspectionType | undefined;
  getIds(keyword: string): Array<number>;
  getTypeName(id: number): string | undefined;
  inspectionTypeTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
