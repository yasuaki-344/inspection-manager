import { IInspectionSheetInteractor } from "../interfaces";

export class InspectionSheetPresenter {
  useCase: IInspectionSheetInteractor

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase
  }
}