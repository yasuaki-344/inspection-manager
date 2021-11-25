import { IInspectionGroupInteractor } from "../interfaces";
import { InspectionGroup } from "../entities";
import { IInspectionGroupPresenter } from "../interfaces/presenter";

export class InspectionGroupPresenter implements IInspectionGroupPresenter {
  private readonly useCase: IInspectionGroupInteractor;

  readonly state: InspectionGroup[];

  readonly editItem: InspectionGroup;

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase;
    this.state = useCase.groups;
    this.editItem = useCase.target;
  }

  getGroupName(id: number): string | undefined {
    return this.useCase.groups.find(
      (x: InspectionGroup) => x.inspectionGroupId === id
    )?.description;
  }
}
