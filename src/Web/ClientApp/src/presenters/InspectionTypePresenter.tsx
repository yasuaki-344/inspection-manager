import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../typescript-fetch";

export class InspectionTypePresenter {
  private readonly useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }

  get(): void {
    this.useCase.get()
  }

  getById(id: number): InspectionType | undefined {
    return this.useCase.getById(id)
  }
}