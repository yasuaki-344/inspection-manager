import { IInspectionSheetRepository } from "../interfaces";
import { InspectionSheet, InspectionSheetApi } from "../typescript-fetch";

export class InspectionSheetRepository implements IInspectionSheetRepository {
  private readonly api: InspectionSheetApi;

  /**
   * Initializes a new instance of InspectionSheetRepository class.
   */
  constructor() {
    this.api = new InspectionSheetApi();
  }

  /** @inheritdoc */
  async get(): Promise<InspectionSheet[]> {
    const res = await this.api.apiV1InspectionSheetsGet();
    return res;
  }

  /** @inheritdoc */
  async getById(id: number): Promise<InspectionSheet> {
    const res = await this.api.apiV1InspectionSheetsIdGet({ id });
    return res;
  }

  /** @inheritdoc */
  async post(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await this.api.apiV1InspectionSheetsPost({ inspectionSheet });
    return res;
  }

  /** @inheritdoc */
  async put(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await this.api.apiV1InspectionSheetsIdPut({
      id: inspectionSheet.sheetId,
      inspectionSheet,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    this.api.apiV1InspectionSheetsIdDelete({ id });
  }
}
