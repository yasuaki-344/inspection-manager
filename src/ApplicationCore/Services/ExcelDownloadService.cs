//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using Microsoft.Extensions.Logging;
using NPOI.SS.UserModel;
using NPOI.SS.Util;
using NPOI.XSSF.UserModel;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public class ExcelDownloadService : IExcelDownloadService
    {
        private readonly IInspectionSheetRepository _repository;
        private readonly ILogger<ExcelDownloadService> _logger;

        /// <summary>
        /// Initializes a new instance of ExcelDownloadService class.
        /// </summary>
        /// <param name="repository">Inspection data access object</param>
        /// <param name="logger">logger object</param>
        public ExcelDownloadService(
            IInspectionSheetRepository repository,
            ILogger<ExcelDownloadService> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        /// <inheritdoc/>
        public bool InspectionSheetExists(string id) => _repository.InspectionSheetExists(id);

        /// <inheritdoc/>
        public IWorkbook CreateXlsx(string id)
        {
            var dto = _repository.GetInspectionSheet(id);
            if (dto != null)
            {
                var book = new XSSFWorkbook();
                book.CreateSheet(dto.SheetName);
                var sheet = book.GetSheet(dto.SheetName);
                var rowIndex = 0;
                WriteCell(sheet, rowIndex, 0, "点検機器");
                WriteCell(sheet, rowIndex, 1, "点検タイプ");
                WriteCell(sheet, rowIndex, 2, "点検項目");
                rowIndex++;
                foreach (var equipment in dto.Equipments)
                {
                    WriteCell(sheet, rowIndex, 0, equipment.EquipmentName);
                    foreach (var item in equipment.InspectionItems)
                    {
                        WriteCell(sheet, rowIndex, 1, item.InspectionContent);
                        switch(item.InputType)
                        {
                            case 1:
                                WriteCell(sheet, rowIndex, 2, "数値入力");
                                break;
                            case 2:
                                WriteCell(sheet, rowIndex, 2, "テキスト入力");
                                break;
                            case 3:
                                WriteCell(sheet, rowIndex, 2, "項目選択");
                                WriteCell(sheet, rowIndex, 3, string.Join("・", item.Choices));
                                break;
                            default:
                                break;
                        }
                        rowIndex++;
                    }
                }
                return book;
            }
            else
            {
                throw new Exception("data not found");
            }
        }

        private void WriteCell(ISheet sheet, int rowIndex, int columnIndex, string value)
        {
            var row = sheet.GetRow(rowIndex) ?? sheet.CreateRow(rowIndex);
            var cell = row.GetCell(columnIndex) ?? row.CreateCell(columnIndex);

            cell.SetCellValue(value);
        }
    }
}
