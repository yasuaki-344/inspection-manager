import { IInspectionGroupController, IInspectionGroupInteractor } from "../interfaces";
import { InspectionGroup } from "../entities";

export class InspectionGroupController implements IInspectionGroupController {
  private readonly useCase: IInspectionGroupInteractor;

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase;
  }

  async fetchInspectionGroup(): Promise<void> {
    await this.useCase.fetchInspectionGroup();
  }

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.create(inspectionGroup);
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.update(inspectionGroup);
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
