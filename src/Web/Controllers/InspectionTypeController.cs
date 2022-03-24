﻿using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
public class InspectionTypeController : ControllerBase
{
    private readonly ICategoryRepository _repository;
    private readonly ILogger<InspectionTypeController> _logger;

    /// <summary>
    /// Initializes a new instance of InspectionTypeController class.
    /// </summary>
    /// <param name="repository">repository object</param>
    /// <param name="logger">logger object</param>
    public InspectionTypeController(
        ICategoryRepository repository,
        ILogger<InspectionTypeController> logger
    )
    {
        _repository = repository;
        _logger = logger;
    }

    /// <summary>
    /// Get all inspection types.
    /// </summary>
    /// <response code="200">A JSON array of InspectionType model</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpGet]
    [Route("/v1/inspection-types")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetAllInspectionTypes()
    {
        try
        {
            _logger.LogInformation("try to get all inspection types");
            var types = _repository.GetInspectionTypes();
            Response.Headers.ContentRange = types.Count().ToString();
            return Ok(types);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }

    /// <summary>
    /// Get InspectionType model by ID.
    /// </summary>
    /// <param name="id">inspection type ID to get</param>
    /// <response code="200">A single InspectionType model</response>
    /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
    /// <response code="404">対象リソースが存在しない Not Found</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpGet]
    [Route("/v1/inspection-types/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetInspectionType([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to get inspection type {id}");
                if (_repository.InspectionTypeExists(id.Value))
                {
                    var result = _repository.GetInspectionType(id.Value);
                    return Ok(result);
                }
                else
                {
                    return NotFound($"type with Id = {id} not found");
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

    /// <summary>
    /// Create a new InspectionType model
    /// </summary>
    /// <param name="dto">inspection type to create</param>
    /// <response code="201">正常系（非同期）Created</response>
    /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpPost]
    [Route("/v1/inspection-types")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateInspectionTypeAsync(InspectionTypeDto? dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection type");
            if (dto is not null)
            {
                var result = await _repository.CreateInspectionTypeAsync(dto);
                return CreatedAtAction(nameof(GetInspectionType),
                new { id = result.InspectionTypeId }, result);
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
                "Error creating new inspection types"
            );
        }
    }

    /// <summary>
    /// Updates the InspectionType model.
    /// </summary>
    /// <param name="id">inspection type ID to update</param>
    /// <param name="dto">inspection type to update</param>
    /// <response code="201">正常系（非同期）Created</response>
    /// <response code="400">Invalid ID supplied</response>
    /// <response code="404">Not found</response>
    /// <response code="500">Internal Server Error</response>
    [HttpPut]
    [Route("/v1/inspection-types/{id}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionTypeAsync([FromRoute][Required] int? id, [FromBody] InspectionTypeDto dto)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to update inspection type {dto.InspectionTypeId}");
                if (id.Value != dto.InspectionTypeId)
                {
                    return BadRequest("Invalid ID supplied");
                }

                if (_repository.InspectionTypeExists(dto.InspectionTypeId))
                {
                    var result = await _repository.UpdateInspectionTypeAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionType),
                    new { id = result.InspectionTypeId }, result);
                }
                else
                {
                    return NotFound($"Type with Id = {dto.InspectionTypeId} not found");
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

    /// <summary>
    /// Deletes the InspectionType model.
    /// </summary>
    /// <param name="id">inspection type ID to delete</param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid ID supplied</response>
    /// <response code="404">Not found</response>
    /// <response code="500">Internal Server Error</response>
    [HttpDelete]
    [Route("/v1/inspection-types/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteInspectionTypeAsync([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to delete inspection type {id}");
                if (_repository.InspectionTypeExists(id.Value))
                {
                    var dto = await _repository.DeleteInspectionTypeAsync(id.Value);
                    return Ok(dto);
                }
                else
                {
                    return NotFound($"type with Id = {id} not found");
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

