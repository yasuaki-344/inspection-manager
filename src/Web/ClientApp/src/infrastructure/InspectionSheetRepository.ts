import { InspectionSheet } from "../entities";
import { IInspectionSheetRepository } from "../interfaces";

export class InspectionSheetRepository implements IInspectionSheetRepository {
  async get(): Promise<Array<InspectionSheet>> {
    const res = await fetch("inspectionsheet");
    return res.json();
  }

  async getById(id: number): Promise<InspectionSheet> {
    const res = await fetch(`inspectionsheet/${id}`);
    return res.json();
  }

  async post(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await fetch("inspectionsheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inspectionSheet),
    });
    return res.json();
  }

  async put(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await fetch(`inspectionsheet/${inspectionSheet.sheet_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inspectionSheet),
    });
    return res.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`inspectionsheet/${id}`, {
      method: "DELETE",
    });
  }
}
