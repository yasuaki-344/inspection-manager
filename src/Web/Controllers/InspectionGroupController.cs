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
public class InspectionGroupController : ControllerBase
{
    private readonly ICategoryRepository _repository;
    private readonly ILogger<InspectionGroupController> _logger;

    /// <summary>
    /// Initializes a new instance of InspectionGroupController class.
    /// </summary>
    /// <param name="repository">repository object</param>
    /// <param name="logger">logger object</param>
    public InspectionGroupController(
        ICategoryRepository repository,
        ILogger<InspectionGroupController> logger
    )
    {
        _repository = repository;
        _logger = logger;
    }

    /// <summary>
    /// Get all inspection groups.
    /// </summary>
    /// <response code="200">A JSON array of InspectionGroup model</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpGet]
    [Route("/v1/inspection-groups")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetAllInspectionGroups()
    {
        try
        {
            _logger.LogInformation("try to get all inspection groups");
            var groups = _repository.GetInspectionGroups();
            Response.Headers.ContentRange = groups.Count().ToString();
            return Ok(groups);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
        }
    }

    /// <summary>
    /// Get InspectionGroup model by ID.
    /// </summary>
    /// <param name="id">inspection group ID to get</param>
    /// <response code="200">A single InspectionGroup model</response>
    /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
    /// <response code="404">対象リソースが存在しない Not Found</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpGet]
    [Route("/v1/inspection-groups/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetInspectionGroup([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to get inspection group {id}");
                if (_repository.InspectionGroupExists(id.Value))
                {
                    var result = _repository.GetInspectionGroup(id.Value);
                    return Ok(result);
                }
                else
                {
                    return NotFound($"group with Id = {id} not found");
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
    /// Create a new InspectionGroup model
    /// </summary>
    /// <param name="dto">inspection group to create</param>
    /// <response code="201">正常系（非同期）Created</response>
    /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
    /// <response code="500">システムエラー Internal Server Error</response>
    [HttpPost]
    [Route("/v1/inspection-groups")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateInspectionGroupAsync([FromBody] InspectionGroupDto? dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection group");
            if (dto is not null)
            {
                var result = await _repository.CreateInspectionGroupAsync(dto);
                return CreatedAtAction(nameof(GetInspectionGroup),
                new { id = result.InspectionGroupId }, result);
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
                "Error creating new inspection group"
            );
        }
    }

    /// <summary>
    /// Updates the InspectionGroup model.
    /// </summary>
    /// <param name="id">inspection group ID to update</param>
    /// <param name="dto">inspection group to update</param>
    /// <response code="201">正常系（非同期）Created</response>
    /// <response code="400">Invalid ID supplied</response>
    /// <response code="404">Not found</response>
    /// <response code="500">Internal Server Error</response>
    [HttpPut]
    [Route("/v1/inspection-groups/{id}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionGroupAsync([FromRoute][Required] int? id, [FromBody] InspectionGroupDto dto)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to update inspection group {dto.InspectionGroupId}");
                if (id.Value != dto.InspectionGroupId)
                {
                    return BadRequest("Invalid ID supplied");
                }

                if (_repository.InspectionGroupExists(dto.InspectionGroupId))
                {
                    var result = await _repository.UpdateInspectionGroupAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionGroup),
                    new { id = result.InspectionGroupId }, result);
                }
                else
                {
                    return NotFound($"Group with Id = {dto.InspectionGroupId} not found");
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
    /// Deletes the InspectionGroup model.
    /// </summary>
    /// <param name="id">inspection group ID to delete</param>
    /// <response code="200">Success</response>
    /// <response code="400">Invalid ID supplied</response>
    /// <response code="404">Not found</response>
    /// <response code="500">Internal Server Error</response>
    [HttpDelete]
    [Route("/v1/inspection-groups/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteInspectionGroupAsync([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to delete inspection group {id}");
                if (_repository.InspectionGroupExists(id.Value))
                {
                    var dto = await _repository.DeleteInspectionGroupAsync(id.Value);
                    return Ok(dto);
                }
                else
                {
                    return NotFound($"group with Id = {id} not found");
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

