import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType } from "../typescript-fetch";

export class InspectionTypeController {
  private readonly useCase: IInspectionTypeInteractor

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase
  }

  async create(inspectionType: InspectionType): Promise<void> {
    this.useCase.create(inspectionType)
  }

  async update(inspectionType: InspectionType): Promise<void> {
    this.useCase.update(inspectionType)
  }

  async delete(id: number): Promise<void> {
    this.useCase.delete(id)
  }
}