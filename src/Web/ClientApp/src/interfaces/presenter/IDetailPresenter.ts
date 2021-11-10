import { Equipment } from "../../entities";

export interface IDetailPresenter {
  /**
   * Returns inspection sheet information element.
   */
  sheetInformationList(): JSX.Element;
  equipments(): Equipment[];
}
