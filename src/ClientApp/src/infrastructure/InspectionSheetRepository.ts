import { IInspectionSheetRepository } from "../interfaces";
import { InspectionSheet, InspectionSheetsApi } from "../typescript-fetch";

export class InspectionSheetRepository implements IInspectionSheetRepository {
  private readonly api: InspectionSheetsApi;

  /**
   * Initializes a new instance of InspectionSheetRepository class.
   */
  constructor() {
    this.api = new InspectionSheetsApi();
  }

  /** @inheritdoc */
  async get(): Promise<InspectionSheet[]> {
    const res = await this.api.inspectionSheetsGet();
    return res;
  }

  /** @inheritdoc */
  async getById(id: number): Promise<InspectionSheet> {
    const res = await this.api.inspectionSheetsSheetIdGet({
      sheetId: id,
    });
    return res;
  }

  /** @inheritdoc */
  async post(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await this.api.inspectionSheetsPost({
      inspectionSheet,
    });
    return res;
  }

  /** @inheritdoc */
  async put(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const res = await this.api.inspectionSheetsSheetIdPut({
      sheetId: inspectionSheet.sheetId,
      inspectionSheet,
    });
    return res;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    this.api.inspectionSheetsSheetIdDelete({
      sheetId: id,
    });
  }
}
