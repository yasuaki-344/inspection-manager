import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemPresenter {
  useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }
}