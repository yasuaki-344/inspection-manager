import React from "react";
import {
  IInspectionTypeController,
  IInspectionTypeInteractor,
} from "../interfaces";
import { InspectionType } from "../entities";

export class InspectionTypeController implements IInspectionTypeController {
  private readonly useCase: IInspectionTypeInteractor;

  constructor(useCase: IInspectionTypeInteractor) {
    this.useCase = useCase;
  }

  async fetchInspectionTypes(): Promise<void> {
    await this.useCase.fetchInspectionTypes();
  }

  createEditItem(): void {
    this.useCase.createEditItem();
  }

  setEditItem(id: number): void {
    this.useCase.setEditItem(id);
  }

  editType = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.useCase.editType(name, value);
  };

  async create(inspectionType: InspectionType): Promise<void> {
    await this.useCase.create(inspectionType);
  }

  async update(inspectionType: InspectionType): Promise<void> {
    await this.useCase.update(inspectionType);
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
