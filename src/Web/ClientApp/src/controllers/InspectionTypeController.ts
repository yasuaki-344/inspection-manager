import { IInspectionTypeInteractor } from "../interfaces";

export class InspectionTypeController {
  useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }
}