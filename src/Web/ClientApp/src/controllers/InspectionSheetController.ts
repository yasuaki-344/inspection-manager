import { IInspectionSheetInteractor } from "../interfaces";

export class InspectionSheetController {
  useCase: IInspectionSheetInteractor

  constructor(useCase: IInspectionSheetInteractor) {
    this.useCase = useCase
  }
}