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

        [HttpGet]
        public ActionResult GetAllInspectionSheets()
        {
            try
            {
                _logger.LogInformation("try to get all inspection sheet");
                var sheets = _service.GetAllInspectionSheets();
                return Ok(sheets);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{id:guid}")]
        public ActionResult<InspectionSheetDto> GetInspectionSheet(string id)
        {
            try
            {
                _logger.LogInformation($"try to get inspection sheet {id}");

                var result = _service.GetInspectionSheet(id);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
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
                    var result = _service.CreateInspectionSheet(new ApplicationCore.Dto.InspectionSheetDto
                    {
                        SheetName = vm.SheetName
                    });
                    return CreatedAtAction(nameof(GetInspectionSheet),
                    new { id = result.SheetId }, result);
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

        [HttpPut("{id:guid}")]
        public ActionResult<InspectionSheetDto> UpdateInspectionSheet(InspectionSheetDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update inspection sheet {dto.SheetId}");
                if (!_service.InspectionSheetExists(dto.SheetId))
                {
                    return NotFound($"Sheet with Id = {dto.SheetId} not found");
                }
                return _service.UpdateInspectionSheet(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:guid}")]
        public ActionResult<InspectionSheetDto> DeleteInspectionSheet(string id)
        {
            try
            {
                _logger.LogInformation($"try to delete inspection sheet {id}");
                if (!_service.InspectionSheetExists(id))
                {
                    return NotFound($"sheet with Id = {id} not found");
                }
                return _service.DeleteInspectionSheet(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error deleting data");
            }
        }
    }
}
