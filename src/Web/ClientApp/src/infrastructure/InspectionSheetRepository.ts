import { InspectionSheet, toCamelCase, toSnakeCase } from "../entities";
import { IInspectionSheetRepository } from "../interfaces";
import { InspectionSheetsApi } from "../typescript-fetch";

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
    const sheets = toCamelCase(res);
    return sheets;
  }

  /** @inheritdoc */
  async getById(id: number): Promise<InspectionSheet> {
    const res = await this.api.inspectionSheetsSheetIdGet({
      sheetId: id,
    });
    const sheet = toCamelCase(res);
    return sheet;
  }

  /** @inheritdoc */
  async post(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const requestBody = toSnakeCase(inspectionSheet);
    const res = await this.api.inspectionSheetsPost({
      inspectionSheetDetail: requestBody,
    });
    const sheet = toCamelCase(res);
    return sheet;
  }

  /** @inheritdoc */
  async put(inspectionSheet: InspectionSheet): Promise<InspectionSheet> {
    const requestBody = toSnakeCase(inspectionSheet);
    const res = await this.api.inspectionSheetsSheetIdPut({
      sheetId: requestBody.sheet_id,
      inspectionSheetDetail: requestBody,
    });
    const sheet = toCamelCase(res);
    return sheet;
  }

  /** @inheritdoc */
  async delete(id: number): Promise<void> {
    this.api.inspectionSheetsSheetIdDelete({
      sheetId: id,
    });
  }
}
