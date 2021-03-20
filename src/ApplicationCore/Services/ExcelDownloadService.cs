//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Linq;
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
                var font = book.CreateFont();
                font.FontName = "Yu Gothic Medium";
                var headingStyle = CreateHeadingCellStyle(book, font);
                var upperHeadingStyle = CreateUpperHeadingCellStyle(book, font);
                var mediumHeadingStyle = CreateMediumHeadingCellStyle(book, font);
                var lowerHeadingStyle = CreateLowerHeadingCellStyle(book, font);
                var baseStyle = CreateBasicCellStyle(book, font);

                var sheet = book.GetSheet(dto.SheetName);
                var rowIndex = 0;
                WriteCell(sheet, rowIndex, 0, "点検機器");
                WriteCell(sheet, rowIndex, 1, "点検項目");
                WriteCell(sheet, rowIndex, 2, "点検タイプ");
                WriteCell(sheet, rowIndex, 3, "点検結果");

                WriteStyle(sheet, rowIndex, 0, headingStyle);
                WriteStyle(sheet, rowIndex, 1, headingStyle);
                WriteStyle(sheet, rowIndex, 2, headingStyle);
                WriteStyle(sheet, rowIndex, 3, headingStyle);
                rowIndex++;

                foreach (var equipment in dto.Equipments)
                {
                    WriteCell(sheet, rowIndex, 0, equipment.EquipmentName);
                    foreach (var (item, index) in equipment.InspectionItems.Select((x, i) => (x, i)))
                    {
                        var lastIndex = equipment.InspectionItems.Count - 1;
                        WriteCell(sheet, rowIndex, 1, item.InspectionContent);
                        switch (item.InputType)
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
                        if (index == 0)
                        {
                            WriteStyle(sheet, rowIndex, 0, upperHeadingStyle);
                        }
                        else if (index == lastIndex)
                        {
                            WriteStyle(sheet, rowIndex, 0, lowerHeadingStyle);
                        }
                        else
                        {

                            WriteStyle(sheet, rowIndex, 0, mediumHeadingStyle);
                        }

                        WriteStyle(sheet, rowIndex, 1, baseStyle);
                        WriteStyle(sheet, rowIndex, 2, baseStyle);
                        WriteStyle(sheet, rowIndex, 3, baseStyle);
                        rowIndex++;
                    }
                }

                sheet.SetColumnWidth(0, 256 * 12);
                sheet.SetColumnWidth(1, 256 * 12);
                sheet.SetColumnWidth(2, 256 * 12);
                sheet.SetColumnWidth(3, 256 * 40);
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

        private ICellStyle CreateHeadingCellStyle(IWorkbook book, IFont font)
        {
            var cellStyle = book.CreateCellStyle();
            // font
            cellStyle.SetFont(font);
            // boreder style
            cellStyle.BorderTop = BorderStyle.Thin;
            cellStyle.BorderRight = BorderStyle.Thin;
            cellStyle.BorderLeft = BorderStyle.Thin;
            cellStyle.BorderBottom = BorderStyle.Thin;
            // background color
            cellStyle.FillForegroundColor = IndexedColors.LightTurquoise.Index;
            cellStyle.FillPattern = FillPattern.SolidForeground;
            // text alignment
            cellStyle.Alignment = HorizontalAlignment.Left;
            cellStyle.VerticalAlignment = VerticalAlignment.Top;
            cellStyle.WrapText = true;
            return cellStyle;
        }

        private ICellStyle CreateUpperHeadingCellStyle(IWorkbook book, IFont font)
        {
            var cellStyle = book.CreateCellStyle();
            // font
            cellStyle.SetFont(font);
            // boreder style
            cellStyle.BorderTop = BorderStyle.Thin;
            cellStyle.BorderRight = BorderStyle.Thin;
            cellStyle.BorderLeft = BorderStyle.Thin;
            cellStyle.BorderBottom = BorderStyle.None;
            // background color
            cellStyle.FillForegroundColor = IndexedColors.LightTurquoise.Index;
            cellStyle.FillPattern = FillPattern.SolidForeground;
            // text alignment
            cellStyle.Alignment = HorizontalAlignment.Left;
            cellStyle.VerticalAlignment = VerticalAlignment.Top;
            cellStyle.WrapText = true;
            // font
            cellStyle.SetFont(font);
            return cellStyle;
        }

        private ICellStyle CreateMediumHeadingCellStyle(IWorkbook book, IFont font)
        {
            var cellStyle = book.CreateCellStyle();
            // font
            cellStyle.SetFont(font);
            // boreder style
            cellStyle.BorderTop = BorderStyle.None;
            cellStyle.BorderRight = BorderStyle.Thin;
            cellStyle.BorderLeft = BorderStyle.Thin;
            cellStyle.BorderBottom = BorderStyle.None;
            // background color
            cellStyle.FillForegroundColor = IndexedColors.LightTurquoise.Index;
            cellStyle.FillPattern = FillPattern.SolidForeground;
            // text alignment
            cellStyle.Alignment = HorizontalAlignment.Left;
            cellStyle.VerticalAlignment = VerticalAlignment.Top;
            cellStyle.WrapText = true;
            // font
            cellStyle.SetFont(font);
            return cellStyle;
        }

        private ICellStyle CreateLowerHeadingCellStyle(IWorkbook book, IFont font)
        {
            var cellStyle = book.CreateCellStyle();
            // font
            cellStyle.SetFont(font);
            // boreder style
            cellStyle.BorderTop = BorderStyle.None;
            cellStyle.BorderRight = BorderStyle.Thin;
            cellStyle.BorderLeft = BorderStyle.Thin;
            cellStyle.BorderBottom = BorderStyle.Thin;
            // background color
            cellStyle.FillForegroundColor = IndexedColors.LightTurquoise.Index;
            cellStyle.FillPattern = FillPattern.SolidForeground;
            // text alignment
            cellStyle.Alignment = HorizontalAlignment.Left;
            cellStyle.VerticalAlignment = VerticalAlignment.Top;
            cellStyle.WrapText = true;
            // font
            cellStyle.SetFont(font);
            return cellStyle;
        }

        private ICellStyle CreateBasicCellStyle(IWorkbook book, IFont font)
        {
            var cellStyle = book.CreateCellStyle();
            // font
            cellStyle.SetFont(font);
            // boreder style
            cellStyle.BorderTop = BorderStyle.Thin;
            cellStyle.BorderRight = BorderStyle.Thin;
            cellStyle.BorderLeft = BorderStyle.Thin;
            cellStyle.BorderBottom = BorderStyle.Thin;
            // text alignment
            cellStyle.WrapText = true;
            return cellStyle;
        }

        public static void WriteStyle(ISheet sheet, int rowIndex, int columnIndex, ICellStyle style)
        {
            var row = sheet.GetRow(rowIndex) ?? sheet.CreateRow(rowIndex);
            var cell = row.GetCell(columnIndex) ?? row.CreateCell(columnIndex);

            cell.CellStyle = style;
        }
    }
}
