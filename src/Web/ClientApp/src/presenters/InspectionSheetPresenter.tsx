import { IInspectionSheetInteractor } from "../interfaces";

export class InspectionSheetPresenter {
  private readonly useCase: IInspectionSheetInteractor

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase
  }
}