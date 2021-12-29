import { Dispatch, SetStateAction, useState } from "react";
import {
  IInspectionTypeInteractor,
  IInspectionTypeRepository,
} from "../interfaces";
import { InspectionType } from "../entities";

export class InspectionTypeInteractor implements IInspectionTypeInteractor {
  readonly types: InspectionType[];

  private readonly setTypes: Dispatch<SetStateAction<InspectionType[]>>;

  readonly target: InspectionType;

  private readonly setTarget: Dispatch<SetStateAction<InspectionType>>;

  private readonly repository: IInspectionTypeRepository;

  constructor(repository: IInspectionTypeRepository) {
    const [types, setTypes] = useState<InspectionType[]>([]);
    this.types = types;
    this.setTypes = setTypes;
    const [target, setTarget] = useState<InspectionType>({
      id: 0,
      description: "",
    });
    this.target = target;
    this.setTarget = setTarget;
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

  createEditItem(): void {
    this.setTarget({
      id: 0,
      description: "タイプ",
    });
  }

  setEditItem(id: number): void {
    const type = this.types.find((x: InspectionType) => x.id === id);
    if (type !== undefined) {
      this.setTarget(type);
    }
  }

  editType(name: string, value: string): void {
    this.setTarget({
      ...this.target,
      [name]: value,
    });
  }

  getIds(keyword: string): number[] {
    return this.types
      .filter((x: InspectionType) => x.description.includes(keyword))
      .map((x: InspectionType) => x.id);
  }

  getById(id: number): InspectionType | undefined {
    return this.types.find((x) => x.id === id);
  }

  getName(id: number): string | undefined {
    return this.types.find((x: InspectionType) => x.id === id)?.description;
  }

  async create(inspectionType: InspectionType): Promise<void> {
    await this.repository.post(inspectionType).then((res: InspectionType) => {
      this.setTypes(this.types.concat(res));
    });
  }

  async update(inspectionType: InspectionType): Promise<void> {
    await this.repository.put(inspectionType).then((res: InspectionType) => {
      this.setTypes(this.types.map((x) => (x.id === res.id ? res : x)));
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id).then(() => {
      this.setTypes(this.types.filter((x: InspectionType) => x.id !== id));
    });
  }
}
