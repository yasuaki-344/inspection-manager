import { InspectionSheet } from "../entities";
import { IHomeController } from "../interfaces";

export class HomeController implements IHomeController {
  exportExcelInspectionSheet(sheet: InspectionSheet): void {
    fetch(`excelsheet/${sheet.sheetId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${sheet.sheetName}.xlsx`;
        a.href = url;
        a.click();
        a.remove();
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1e4);
      })
      .catch(console.error);
  }

  exportJsonInspectionSheet(sheet: InspectionSheet): void {
    fetch(`jsonexport/${sheet.sheetId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = `${sheet.sheetName}.json`;
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
