import { InspectionSheet } from "../entities";
import {
  IHomeController,
  IInspectionGroupInteractor,
  IInspectionSheetInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class HomeController implements IHomeController {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  private readonly sheetUseCase: IInspectionSheetInteractor;

  /**
   * Initializes a new instance of HomeController class
   * @param typeUseCase IInspectionTypeInteractor object.
   * @param groupUseCase IInspectionGroupInteractor object.
   * @param sheetUseCase IInspectionSheetInteractor object.
   */
  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor,
    sheetUseCase: IInspectionSheetInteractor
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
    this.sheetUseCase = sheetUseCase;
  }

  /** @inheritdoc */
  async fetchDisplayData(): Promise<void> {
    await this.typeUseCase.fetchInspectionTypes();
    await this.groupUseCase.fetchInspectionGroups();
    await this.sheetUseCase.fetchAllInspectionSheets();
  }

  /** @inheritdoc */
  searchInspectionSheet(
    groupKeyword: string,
    typeKeyword: string,
    sheetKeyword: string
  ): void {
    if (groupKeyword === "" && typeKeyword === "" && sheetKeyword === "") {
      this.sheetUseCase.resetSearchedInspectionSheets();
    } else {
      const groupIds = this.groupUseCase.getIds(groupKeyword);
      const typeIds = this.typeUseCase.getIds(typeKeyword);
      this.sheetUseCase.searchInspectionSheet(groupIds, typeIds, sheetKeyword);
    }
  }

  /** @inheritdoc */
  async removeInspectionSheet(id: number): Promise<void> {
    await this.sheetUseCase.removeInspectionSheet(id);
  }

  exportExcelInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `excelsheet/${sheet.sheetId}`,
      `${sheet.sheetName}.xlsx`
    );
  }

  exportJsonInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `v1/json-inspection-sheets/${sheet.sheetId}`,
      `${sheet.sheetName}.json`
    );
  }

  private exportInspectionSheet(exportUrl: string, fileName: string): void {
    fetch(exportUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = fileName;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1e4);
      })
      .catch(console.error);
  }
}
