import { Dispatch, SetStateAction, useState } from "react";
import {
  IInspectionTypeInteractor,
  IInspectionTypeRepository,
} from "../interfaces";
import { InspectionType } from "../typescript-fetch";

export class InspectionTypeInteractor implements IInspectionTypeInteractor {
  readonly types: InspectionType[];

  private readonly setTypes: Dispatch<SetStateAction<InspectionType[]>>;

  private readonly repository: IInspectionTypeRepository;

  constructor(repository: IInspectionTypeRepository) {
    const [types, setTypes] = useState<InspectionType[]>([]);
    this.types = types;
    this.setTypes = setTypes;
    this.repository = repository;
  }

  /** @inheritdoc */
  async fetchInspectionTypes(): Promise<InspectionType[]> {
    const types = await this.repository.get().then((res) => {
      this.setTypes(res);
      return res;
    });
    return types;
  }

  getIds(keyword: string): number[] {
    return this.types
      .filter((x: InspectionType) => x.description.includes(keyword))
      .map((x: InspectionType) => x.id);
  }

  getName(id: number): string | undefined {
    return this.types.find((x: InspectionType) => x.id === id)?.description;
  }
}
