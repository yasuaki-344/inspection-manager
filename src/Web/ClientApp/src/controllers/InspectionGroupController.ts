import React from "react";
import {
  IInspectionGroupController,
  IInspectionGroupInteractor,
} from "../interfaces";
import { InspectionGroup } from "../entities";

export class InspectionGroupController implements IInspectionGroupController {
  private readonly useCase: IInspectionGroupInteractor;

  constructor(useCase: IInspectionGroupInteractor) {
    this.useCase = useCase;
  }

  async fetchInspectionGroups(): Promise<void> {
    await this.useCase.fetchInspectionGroups();
  }

  createEditItem(): void {
    this.useCase.createEditItem();
  }

  setEditItem(id: number): void {
    this.useCase.setEditItem(id);
  }

  editGroup = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    this.useCase.editGroup(name, value);
  };

  async create(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.create(inspectionGroup);
  }

  async update(inspectionGroup: InspectionGroup): Promise<void> {
    await this.useCase.update(inspectionGroup);
  }

  async delete(id: number): Promise<void> {
    await this.useCase.delete(id);
  }
}
