//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ExcelSheetController : ControllerBase
    {
        private readonly IExcelDownloadService _service;
        private readonly ILogger<ExcelSheetController> _logger;

        /// <summary>
        /// Initializes a new instance of ExcelSheetController class.
        /// </summary>
        /// <param name="service">Excel download service object</param>
        /// <param name="logger">logger object</param>
        public ExcelSheetController(
            IExcelDownloadService service,
            ILogger<ExcelSheetController> logger
        )
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet("{id:guid}")]
        public ActionResult<InspectionSheetDto> DownloadExcelSheet(string id)
        {
            try
            {
                _logger.LogInformation($"try to download inspection sheet {id}");
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

    }
}
