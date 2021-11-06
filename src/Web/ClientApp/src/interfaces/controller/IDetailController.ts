export interface IDetailController {
  fetchDisplayData(sheetId: number): Promise<void>;
}
