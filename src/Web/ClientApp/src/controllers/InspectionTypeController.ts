import {
  IInspectionTypeController,
  IInspectionTypeInteractor,
} from "../interfaces";
import { InspectionType } from "../entities";

export class InspectionTypeController implements IInspectionTypeController {
  private readonly useCase: IInspectionTypeInteractor;

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase;
  }

  async create(inspectionType: InspectionType): Promise<void> {
    await this.useCase.create(inspectionType);
  }

  async update(inspectionType: InspectionType): Promise<void> {
    await this.useCase.update(inspectionType);
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
