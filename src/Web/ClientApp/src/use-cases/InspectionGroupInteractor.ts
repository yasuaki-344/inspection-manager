import { Dispatch, SetStateAction, useState } from "react";
import {
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
} from "../interfaces";
import { InspectionGroup } from "../entities";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  readonly groups: InspectionGroup[];

  private readonly setGroups: Dispatch<SetStateAction<InspectionGroup[]>>;

  readonly target: InspectionGroup;

  private readonly setTarget: Dispatch<SetStateAction<InspectionGroup>>;

  private readonly repository: IInspectionGroupRepository;

  constructor(repository: IInspectionGroupRepository) {
    const [groups, setGroups] = useState<InspectionGroup[]>([]);
    this.groups = groups;
    this.setGroups = setGroups;
    const [target, setTarget] = useState<InspectionGroup>({
      inspectionGroupId: 0,
      description: "",
    });
    this.target = target;
    this.setTarget = setTarget;
    this.repository = repository;
  }

  /**
   * Fetch all inspection groups from database.
   */
  async fetchInspectionGroups(): Promise<void> {
    await this.repository.get().then((res) => {
      this.setGroups(res);
    });
  }

  createEditItem(): void {
    this.setTarget({
      inspectionGroupId: 0,
      description: "グループ",
    });
  }

  setEditItem(id: number): void {
    const group = this.groups.find(
      (x: InspectionGroup) => x.inspectionGroupId === id
    );
    if (group !== undefined) {
      this.setTarget(group);
    }
  }

  editGroup(name: string, value: string): void {
    this.setTarget({
      ...this.target,
      [name]: value,
    });
  }

  getIds(keyword: string): number[] {
    return this.groups
      .filter((x: InspectionGroup) => x.description.includes(keyword))
      .map((x: InspectionGroup) => x.inspectionGroupId);
  }

  getName(id: number): string | undefined {
    return this.groups.find((x: InspectionGroup) => x.inspectionGroupId === id)
      ?.description;
  }

  getById(id: number): InspectionGroup | undefined {
    return this.groups.find((x) => x.inspectionGroupId === id);
  }

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    await this.repository.post(inspectionGroup).then((res: InspectionGroup) => {
      this.setGroups(this.groups.concat(res));
    });
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    await this.repository.put(inspectionGroup).then((res: InspectionGroup) => {
      this.setGroups(
        this.groups.map((x) =>
          x.inspectionGroupId === res.inspectionGroupId ? res : x
        )
      );
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id).then(() => {
      this.setGroups(
        this.groups.filter((x: InspectionGroup) => x.inspectionGroupId !== id)
      );
    });
  }
}
