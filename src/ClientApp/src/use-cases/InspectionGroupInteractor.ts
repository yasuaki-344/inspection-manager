import { Dispatch, SetStateAction, useState } from "react";
import {
  IInspectionGroupInteractor,
  IInspectionGroupRepository,
} from "../interfaces";
import { InspectionGroup } from "../typescript-fetch";

export class InspectionGroupInteractor implements IInspectionGroupInteractor {
  readonly groups: InspectionGroup[];

  private readonly setGroups: Dispatch<SetStateAction<InspectionGroup[]>>;

  private readonly repository: IInspectionGroupRepository;

  constructor(repository: IInspectionGroupRepository) {
    const [groups, setGroups] = useState<InspectionGroup[]>([]);
    this.groups = groups;
    this.setGroups = setGroups;
    this.repository = repository;
  }

  /** @inheritdoc */
  async fetchInspectionGroups(): Promise<InspectionGroup[]> {
    const groups = await this.repository.get().then((res) => {
      this.setGroups(res);
      return res;
    });
    return groups;
  }

  getIds(keyword: string): number[] {
    return this.groups
      .filter((x: InspectionGroup) => x.description.includes(keyword))
      .map((x: InspectionGroup) => x.id);
  }

  getName(id: number): string | undefined {
    return this.groups.find((x: InspectionGroup) => x.id === id)?.description;
  }
}
