import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemController {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }
}