//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
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

        public bool InspectionSheetExists(string id) => _repository.InspectionSheetExists(id);

        public IWorkbook CreateXlsx(string id)
        {

            var book = new XSSFWorkbook();
            book.CreateSheet("sample");
            var sheet = book.GetSheet("sample");

            var row = sheet.CreateRow(0);
            var cell = row.CreateCell(0);

            cell.SetCellValue("test");

            return book;
        }

        private void WriteCell(ISheet sheet, int columnIndex, int rowIndex, string value)
        {
            var row = sheet.GetRow(rowIndex) ?? sheet.CreateRow(rowIndex);
            var cell = row.GetCell(columnIndex) ?? row.CreateCell(columnIndex);

            cell.SetCellValue(value);
        }
    }
}
