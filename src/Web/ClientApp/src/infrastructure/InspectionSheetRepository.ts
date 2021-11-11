import { InspectionSheet, toCamelCase, toSnakeCase } from "../entities";
import { IInspectionSheetRepository } from "../interfaces";
import { InspectionSheetsApi } from "../typescript-fetch";

export class InspectionSheetRepository implements IInspectionSheetRepository {
  private readonly api: InspectionSheetsApi;

  /**
   * Initializes a new instance of InspectionSheetRepository class.
   */
  constructor() {
    this.api = new InspectionSheetsApi()
  }

  /** @inheritdoc */
  async get(): Promise<InspectionSheet[]> {
    const res = await this.api.inspectionSheetsGet();
    const sheets = toCamelCase(res);
    return sheets;
  }

  async getById(id: number): Promise<InspectionSheet> {
    const data = await fetch(`inspectionsheet/${id}`)
      .then((res) => res.json())
      .then((json) => toCamelCase(json));
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
      .then((res) => res.json())
      .then((json) => toCamelCase(json));
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
      .then((res) => res.json())
      .then((json) => toCamelCase(json));
    return data;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    this.api.inspectionSheetsSheetIdDelete({
      sheetId: id
    })
  }
}
