import { IInspectionSheetInteractor } from "../interfaces";

export class InspectionSheetController {
  private readonly useCase: IInspectionSheetInteractor

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase
  }
}