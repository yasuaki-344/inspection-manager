import { IInspectionTypeInteractor } from "../interfaces";

export class InspectionTypePresenter {
  useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }
}