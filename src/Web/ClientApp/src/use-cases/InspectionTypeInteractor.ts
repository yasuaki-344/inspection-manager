import { Dispatch, SetStateAction } from "react";
import { IInspectionTypeInteractor } from "../interfaces";
import { InspectionType, InspectionTypesApi } from "../typescript-fetch";

export class InspectionTypeInteractor implements IInspectionTypeInteractor {
  private readonly types: InspectionType[]
  private readonly setTypes: Dispatch<SetStateAction<InspectionType[]>>
  private readonly api: InspectionTypesApi

  constructor(types: InspectionType[], setTypes: Dispatch<SetStateAction<InspectionType[]>>) {
    this.types = types;
    this.setTypes = setTypes;
    this.api = new InspectionTypesApi();
  }

  getTypes(): InspectionType[] {
    return this.types;
  }

  get(): void {
    this.api.inspectionTypesGet()
      .then(res => {
        this.setTypes(res)
      })
      .catch(console.error);
  }

  getById(id: number): InspectionType | undefined {
    return this.types.find(x => x.inspection_type_id === id);
  }

  create(inspectionType: InspectionType): void {
    this.api.inspectionTypesPost({
      'inspectionType': inspectionType
    })
      .then(res => {
        this.setTypes(this.types.concat(inspectionType));
      })
      .catch(error => {
        console.error(error);
      })
  }

  update(inspectionType: InspectionType): void {
    this.api.inspectionTypesInspectionTypeIdPut({
      inspectionTypeId: inspectionType.inspection_type_id,
      inspectionType: inspectionType
    })
      .then(res => {
        this.setTypes(this.types.map(x =>
          (x.inspection_type_id === res.inspection_type_id) ? res : x
        ));
      })
      .catch(error => {
        console.log(error);
      });
  }

  delete(id: number): void {
    this.api.inspectionTypesInspectionTypeIdDelete({
      'inspectionTypeId': id
    })
      .then(() => {
        this.setTypes(this.types.filter((x: InspectionType) =>
          x.inspection_type_id !== id));
      })
      .catch(error => {
        console.error(error);
      });
  }
}