import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemPresenter {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }
}