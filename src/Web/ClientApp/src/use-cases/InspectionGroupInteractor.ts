import { IInspectionGroupInteractor, IInspectionGroupRepository } from "../interfaces";
import { InspectionGroup } from "../typescript-fetch";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  private readonly groups: Array<InspectionGroup>;
  private readonly setGroups: React.Dispatch<React.SetStateAction<Array<InspectionGroup>>>
  private readonly repository: IInspectionGroupRepository

  constructor(
    groups: Array<InspectionGroup>,
    setGroups: React.Dispatch<React.SetStateAction<Array<InspectionGroup>>>,
    repository: IInspectionGroupRepository
  ) {
    this.groups = groups;
    this.setGroups = setGroups;
    this.repository = repository;
  }
}