import { IInspectionGroupInteractor } from "../interfaces";

export class InspectionGroupPresenter {
  useCase: IInspectionGroupInteractor

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase
  }
}