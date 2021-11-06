import { InspectionSheet } from "../entities";
import {
  IHomeController,
  IInspectionGroupInteractor,
  IInspectionTypeInteractor,
} from "../interfaces";

export class HomeController implements IHomeController {
  private readonly typeUseCase: IInspectionTypeInteractor;

  private readonly groupUseCase: IInspectionGroupInteractor;

  constructor(
    typeUseCase: IInspectionTypeInteractor,
    groupUseCase: IInspectionGroupInteractor
  ) {
    this.typeUseCase = typeUseCase;
    this.groupUseCase = groupUseCase;
  }

  async fetchDisplayData(): Promise<void> {
    await this.typeUseCase.fetchInspectionTypes();
    await this.groupUseCase.fetchInspectionGroup();
  }

  getGroupIds(keyword: string): number[] {
    return this.groupUseCase.getIds(keyword);
  }

  getTypeIds(keyword: string): number[] {
    return this.typeUseCase.getIds(keyword);
  }

  exportExcelInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `excelsheet/${sheet.sheetId}`,
      `${sheet.sheetName}.xlsx`
    );
  }

  exportJsonInspectionSheet(sheet: InspectionSheet): void {
    this.exportInspectionSheet(
      `jsonexport/${sheet.sheetId}`,
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
