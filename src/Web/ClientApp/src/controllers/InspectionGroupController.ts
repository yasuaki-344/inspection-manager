import { IInspectionGroupInteractor } from "../interfaces";

export class InspectionGroupController {
  useCase: IInspectionGroupInteractor

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase
  }
}