using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
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
    public class InspectionSheetController : ControllerBase
    {
        private readonly IInspectionSheetService _service;
        private readonly ILogger<InspectionSheetController> _logger;

        /// <summary>
        /// Initializes a new instance of InspectionSheetController class.
        /// </summary>
        /// <param name="service">Inspection sheet CRUD service object</param>
        /// <param name="logger">logger object</param>
        public InspectionSheetController(
            IInspectionSheetService service,
            ILogger<InspectionSheetController> logger
        )
        {
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        [Route("/v1/inspection-sheets")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionSheetDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllInspectionSheets()
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

        [HttpPost]
        [Route("/v1/inspection-sheets")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionSheetDetailDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> CreateSheetAsync([FromBody] InspectionSheetDetailDto dto)
        {
            try
            {
                _logger.LogInformation("try to create inspection sheet");
                if (!_service.IsValidInspectionSheet(dto))
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _service.CreateInspectionSheetAsync(dto);
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

        [HttpGet]
        [Route("/v1/inspection-sheets/{sheetId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionSheetDetailDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetInspectionSheet([FromRoute][Required] int? sheetId)
        {
            try
            {
                _logger.LogInformation($"try to get inspection sheet {sheetId}");
                if (sheetId is not null)
                {
                    var result = _service.GetInspectionSheet(sheetId.Value);
                    if (result is null)
                    {
                        return NotFound();
                    }
                    else
                    {
                        return Ok(result);
                    }
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPut]
        [Route("/v1/inspection-sheets/{sheetId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<ActionResult<InspectionSheetDetailDto>> UpdateInspectionSheet([FromRoute][Required] int? sheetId, [FromBody] InspectionSheetDetailDto dto)
        {
            try
            {
                if (sheetId.HasValue && _service.IsValidInspectionSheet(dto))
                {
                    _logger.LogInformation($"try to update inspection sheet {sheetId.Value}");
                    if (!_service.InspectionSheetExists(sheetId.Value))
                    {
                        return NotFound($"Sheet with Id = {dto.SheetId} not found");
                    }
                    dto.SheetId = sheetId.Value;
                    var result = await _service.UpdateInspectionSheetAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionSheet),
                    new { sheetId = result.SheetId }, result);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete]
        [Route("/v1/inspection-sheets/{sheetId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteInspectionSheetAsync([FromRoute][Required] int? sheetId)
        {
            try
            {
                if (sheetId is not null)
                {
                    _logger.LogInformation($"try to delete inspection sheet {sheetId}");
                    if (!_service.InspectionSheetExists(sheetId.Value))
                    {
                        return NotFound($"sheet with Id = {sheetId} not found");
                    }
                    await _service.DeleteInspectionSheetAsync(sheetId.Value);
                    return NoContent();
                }
                else
                {
                    return BadRequest();
                }
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
