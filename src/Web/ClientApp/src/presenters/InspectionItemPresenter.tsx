import { InspectionItem } from "../entities";
import { IInspectionItemInteractor } from "../interfaces";

export class InspectionItemPresenter {
  private readonly useCase: IInspectionItemInteractor

  constructor(useCase: IInspectionItemInteractor) {
    this.useCase = useCase
  }

  getState(): InspectionItem {
    return this.useCase.getState();
  }
}