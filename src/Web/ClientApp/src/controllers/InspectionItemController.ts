import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemController {
  useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }
}