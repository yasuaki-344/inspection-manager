import { IInspectionGroupInteractor, IInspectionGroupRepository } from "../interfaces";
import { InspectionGroup } from "../typescript-fetch";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  readonly groups: Array<InspectionGroup>;
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

  get(): void {
    this.repository.get()
      .then(res => {
        this.setGroups(res)
      })
      .catch(console.error);
  }

  getById(id: number): InspectionGroup | undefined {
    return this.groups.find(x => x.inspection_group_id === id);
  }

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    const res = await this.repository.post(inspectionGroup);
    this.setGroups(this.groups.concat(res));
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    const res = await this.repository.put(inspectionGroup);
    this.setGroups(this.groups.map(x =>
      (x.inspection_group_id === res.inspection_group_id) ? res : x
    ));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.setGroups(this.groups.filter((x: InspectionGroup) =>
      x.inspection_group_id !== id));
  }
}