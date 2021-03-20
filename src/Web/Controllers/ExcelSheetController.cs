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
        private readonly ILogger<ExcelSheetController> _logger;

        /// <summary>
        /// Initializes a new instance of ExcelSheetController class.
        /// </summary>
        /// <param name="logger">logger object</param>
        public ExcelSheetController(
            ILogger<ExcelSheetController> logger
        )
        {
            _logger = logger;
        }
    }
}
