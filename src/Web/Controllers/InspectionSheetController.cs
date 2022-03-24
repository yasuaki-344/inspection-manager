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

namespace InspectionManager.Web.Controllers;

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
            if (sheetId is not null)
            {
                _logger.LogInformation($"try to get inspection sheet {sheetId}");
                if (_service.InspectionSheetExists(sheetId.Value))
                {
                    var result = _service.GetInspectionSheet(sheetId.Value);
                    return Ok(result);
                }
                else
                {
                    return NotFound($"sheet with Id = {sheetId} not found");
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

    [HttpPost]
    [Route("/v1/inspection-sheets")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionSheetDetailDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateSheetAsync([FromBody] InspectionSheetDetailDto? dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection sheet");
            if (dto is not null)
            {
                if (_service.IsValidInspectionSheet(dto))
                {
                    var result = await _service.CreateInspectionSheetAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionSheet),
                    new { id = result.SheetId }, result);
                }
                else
                {
                    return BadRequest();
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
                "Error creating new inspection sheet"
            );
        }
    }

    [HttpPut]
    [Route("/v1/inspection-sheets/{sheetId}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionSheetDetailDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionSheetAsync([FromRoute][Required] int? sheetId, [FromBody] InspectionSheetDetailDto dto)
    {
        try
        {
            if (sheetId is not null && _service.IsValidInspectionSheet(dto))
            {
                _logger.LogInformation($"try to update inspection sheet {sheetId.Value}");
                if (sheetId.Value != dto.SheetId)
                {
                    return BadRequest("Invalid ID supplied");
                }

                if (_service.InspectionSheetExists(sheetId.Value))
                {
                    var result = await _service.UpdateInspectionSheetAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionSheet),
                    new { sheetId = result.SheetId }, result);
                }
                else
                {
                    return NotFound($"Sheet with Id = {dto.SheetId} not found");
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
                if (_service.InspectionSheetExists(sheetId.Value))
                {
                    await _service.DeleteInspectionSheetAsync(sheetId.Value);
                    return NoContent();
                }
                else
                {
                    return NotFound($"sheet with Id = {sheetId} not found");
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
                "Error deleting data");
        }
    }
}

