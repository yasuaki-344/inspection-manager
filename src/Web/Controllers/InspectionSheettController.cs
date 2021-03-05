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
using InspectionManager.ApplicationCore.Interfaces;
using InspectionManager.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InspectionSheetController : ControllerBase
    {
        private readonly IInspectionSheetService _service;
        private readonly ILogger<InspectionSheetController> _logger;

        public InspectionSheetController(
            IInspectionSheetService service,
            ILogger<InspectionSheetController> logger
        )
        {
            _service = service;
            _logger = logger;
        }

        [HttpPost]
        public ActionResult<InspectionSheetViewModel> CreateSheet(InspectionSheetViewModel? vm)
        {
            try
            {
                if (vm == null)
                {
                    return BadRequest();
                }
                else
                {
                    _logger.LogInformation($"{vm.SheetName}");
                    _service.CreateInspectionSheet(new ApplicationCore.Dto.InspectionSheetDto
                    {
                        SheetName = vm.SheetName
                    });
                    return StatusCode(StatusCodes.Status200OK);
                }
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
