//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using Microsoft.Extensions.Logging;

namespace InspectionManager.ApplicationCore.Interfaces
{
    public class ExcelDownloadService : IExcelDownloadService
    {
        private readonly ILogger<ExcelDownloadService> _logger;

        /// <summary>
        /// Initializes a new instance of ExcelDownloadService class.
        /// </summary>
        /// <param name="logger">logger object</param>
        public ExcelDownloadService(ILogger<ExcelDownloadService> logger)
        {
            _logger = logger;
        }
    }
}
