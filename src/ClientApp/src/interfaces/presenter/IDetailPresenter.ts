import { Equipment } from "../../entities";

export interface IDetailPresenter {
  sheetName: string;

  equipments: Equipment[];

  /**
   * Returns inspection group which inspection sheet belong to.
   */
  getInspectionGroup(): string | undefined;

  /**
   * Returns inspection type which inspection sheet belong to.
   */
  getInspectionType(): string | undefined;
}
