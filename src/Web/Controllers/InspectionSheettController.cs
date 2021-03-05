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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InspectionSheetController : ControllerBase
    {
        private readonly ILogger<InspectionSheetController> _logger;

        public InspectionSheetController(ILogger<InspectionSheetController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<WeatherForecast> CreateSheet()
        {
            try
            {
                _logger.LogInformation("start");
                throw new System.NotImplementedException();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new inspection sheet"
                );
            }
        }
    }
}
