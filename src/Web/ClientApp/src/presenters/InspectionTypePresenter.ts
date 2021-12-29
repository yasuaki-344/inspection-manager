import {
  IInspectionTypeInteractor,
  IInspectionTypePresenter,
} from "../interfaces";
import { InspectionType } from "../entities";

export class InspectionTypePresenter implements IInspectionTypePresenter {
  private readonly useCase: IInspectionTypeInteractor;

  readonly state: InspectionType[];

  readonly editItem: InspectionType;

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase;
    this.state = useCase.types;
    this.editItem = useCase.target;
  }

  getTypeName(id: number): string | undefined {
    return this.useCase.types.find((x: InspectionType) => x.id === id)
      ?.description;
  }
}
