import { IInspectionGroupInteractor } from "../interfaces";
import { InspectionGroup } from "../typescript-fetch";

export class InspectionGroupController {
  useCase: IInspectionGroupInteractor

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase
  }

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.create(inspectionGroup)
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.update(inspectionGroup)
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id)
  }
}