//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using NPOI.SS.UserModel;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public interface IExcelDownloadService
    {
        /// <summary>
        /// Checks if the specified inspection sheet exists.
        /// </summary>
        /// <param name="id">Sheet ID to be checked</param>
        /// <returns>Return True if exist, otherwise false.</returns>
        bool InspectionSheetExists(int id);

        /// <summary>
        /// Create a xlsx data using the specified inspection sheet.
        /// </summary>
        /// <param name="id">The ID of inspection sheet to be used.</param>
        /// <returns>Excel workbook.</returns>
        IWorkbook CreateXlsx(int id);
    }
}
