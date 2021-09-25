import { ChoiceTemplate } from "../../entities";

export interface IChoiceTemplatePresenter {
  readonly state: Array<ChoiceTemplate>;
  get(): void;
  getById(id: number): ChoiceTemplate | undefined;
  getByIndex(index: number): ChoiceTemplate | undefined;
  choiceTemplateTable(
    updateMethod: (id: number) => void,
    deleteMethod: (id: number) => void
  ): JSX.Element;
}
