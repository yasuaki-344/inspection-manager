import { Equipment } from "../../entities";

export interface IDetailPresenter {
  sheetInformationList(): JSX.Element;
  equipments(): Equipment[];
}
