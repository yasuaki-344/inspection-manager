import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../typescript-fetch";

export class InspectionTypeController {
  private readonly useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }

  create(inspectionType: InspectionType): void {
    this.useCase.create(inspectionType)
  }

  update(inspectionType: InspectionType): void {
    this.useCase.update(inspectionType)
  }

  delete(id: number): void {
    this.useCase.delete(id)
  }
}