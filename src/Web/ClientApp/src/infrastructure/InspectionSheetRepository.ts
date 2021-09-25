import { InspectionSheet, toCamelCase, toSnakeCase } from "../entities";
import { IInspectionSheetRepository } from "../interfaces";

export class InspectionSheetRepository implements IInspectionSheetRepository {
  async get(): Promise<Array<InspectionSheet>> {
    const res = await fetch("inspectionsheet");
    const data = res.json();
    return toCamelCase(data);
  }

  async getById(id: number): Promise<InspectionSheet> {
    const data = await fetch(`inspectionsheet/${id}`)
      .then(res => res.json())
      .then(json => toCamelCase(json));
    return data;
  }

  async post(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const data = await fetch("inspectionsheet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSnakeCase(inspectionSheet)),
    })
      .then(res => res.json())
      .then(json => toCamelCase(json));
    return data;
  }

  async put(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const data = await fetch(`inspectionsheet/${inspectionSheet.sheetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSnakeCase(inspectionSheet)),
    })
      .then(res => res.json())
      .then(json => toCamelCase(json));
    return data;
  }

  async delete(id: number): Promise<void> {
    await fetch(`inspectionsheet/${id}`, {
      method: "DELETE",
    });
  }
}
