import { Dispatch, SetStateAction } from "react";
import { IInspectionTypeInteractor, IInspectionTypeRepository } from "../interfaces";
import { InspectionType } from "../typescript-fetch";

export class InspectionTypeInteractor implements IInspectionTypeInteractor {
  private readonly types: InspectionType[]
  private readonly setTypes: Dispatch<SetStateAction<InspectionType[]>>
  private readonly repository: IInspectionTypeRepository

  constructor(
    types: InspectionType[],
    setTypes: Dispatch<SetStateAction<InspectionType[]>>,
    repository: IInspectionTypeRepository
  ) {
    this.types = types;
    this.setTypes = setTypes;
    this.repository = repository;
  }

  getTypes(): InspectionType[] {
    return this.types;
  }

  get(): void {
    this.repository.get()
      .then(res => {
        this.setTypes(res)
      })
      .catch(console.error);
  }

  getById(id: number): InspectionType | undefined {
    return this.types.find(x => x.inspection_type_id === id);
  }

  async create(inspectionType: InspectionType): Promise<void> {
    const res = await this.repository.post(inspectionType);
    this.setTypes(this.types.concat(res));
  }

  async update(inspectionType: InspectionType): Promise<void> {
    const res = await this.repository.put(inspectionType);
    this.setTypes(this.types.map(x =>
      (x.inspection_type_id === res.inspection_type_id) ? res : x
    ));
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    this.setTypes(this.types.filter((x: InspectionType) =>
      x.inspection_type_id !== id));
  }
}