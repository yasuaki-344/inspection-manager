import React, { useState } from "react";
import {
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
} from "../interfaces";
import { InspectionGroup } from "../entities";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  readonly groups: InspectionGroup[];

  private readonly setGroups: React.Dispatch<
    React.SetStateAction<InspectionGroup[]>
  >;

  private readonly repository: IInspectionGroupRepository;

  constructor(repository: IInspectionGroupRepository) {
    const [groups, setGroups] = useState<InspectionGroup[]>([]);
    this.groups = groups;
    this.setGroups = setGroups;
    this.repository = repository;
  }

  /**
   * Fetch all inspection groups from database.
   */
  async fetchInspectionGroup(): Promise<void> {
    await this.repository.get().then((res) => {
      this.setGroups(res);
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
    const res = await this.repository.post(inspectionGroup);
    this.setGroups(this.groups.concat(res));
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    const res = await this.repository.put(inspectionGroup);
    this.setGroups(
      this.groups.map((x) =>
        x.inspectionGroupId === res.inspectionGroupId ? res : x
      )
    );
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.setGroups(
      this.groups.filter((x: InspectionGroup) => x.inspectionGroupId !== id)
    );
  }
}
