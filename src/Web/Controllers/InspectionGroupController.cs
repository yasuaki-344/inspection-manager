//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
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
        public IActionResult GetAllGroups()
        {
            try
            {
                _logger.LogInformation("try to get all inspection groups");
                var groups = _repository.GetInspectionGroups();
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
        /// <param name="inspectionGroupId">inspection group ID to get</param>
        /// <response code="200">A single InspectionGroup model</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="404">対象リソースが存在しない Not Found</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/inspection-groups/{inspectionGroupId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetInspectionGroup([FromRoute][Required] int? inspectionGroupId)
        {
            try
            {
                if (inspectionGroupId.HasValue)
                {
                    _logger.LogInformation($"try to get inspection group {inspectionGroupId}");
                    var result = _repository.GetInspectionGroup(inspectionGroupId.Value);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound($"group with Id = {inspectionGroupId} not found");
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
        /// <param name="body">inspection group to create</param>
        /// <response code="201">正常系（非同期）Accepted</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpPost]
        [Route("/v1/inspection-groups")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionGroupDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateGroup([FromBody] InspectionGroupDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create inspection group");
                if (dto == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _repository.CreateInspectionGroupAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionGroup),
                    new { id = result.InspectionGroupId }, result);
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
        /// <param name="inspectionGroupId">inspection group ID to update</param>
        /// <param name="body">inspection group to update</param>
        /// <response code="202">正常系（非同期）Accepted</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPut]
        [Route("/v1/inspection-groups/{inspectionGroupId}")]
        public async Task<ActionResult<InspectionGroupDto>> UpdateInspectionGroup([FromRoute][Required] int? inspectionGroupId, [FromBody] InspectionGroupDto dto)
        {
            try
            {
                if (inspectionGroupId.HasValue)
                {
                    _logger.LogInformation($"try to update inspection group {dto.InspectionGroupId}");
                    if (_repository.InspectionGroupExists(dto.InspectionGroupId))
                    {
                        if (inspectionGroupId.Value == dto.InspectionGroupId)
                        {
                            return await _repository.UpdateInspectionGroupAsync(dto);
                        }
                        else
                        {
                            return BadRequest("Invalid ID supplied");
                        }
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
        /// <param name="inspectionGroupId">inspection group ID to delete</param>
        /// <response code="204">No Content</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpDelete]
        [Route("/v1/inspection-groups/{inspectionGroupId}")]
        public async Task<IActionResult> DeleteInspectionGroupAsync([FromRoute][Required] int? inspectionGroupId)
        {
            try
            {
                if (inspectionGroupId.HasValue)
                {
                    _logger.LogInformation($"try to delete inspection group {inspectionGroupId}");
                    if (!_repository.InspectionGroupExists(inspectionGroupId.Value))
                    {
                        return NotFound($"group with Id = {inspectionGroupId} not found");
                    }
                    await _repository.DeleteInspectionGroupAsync(inspectionGroupId.Value);
                    return StatusCode(StatusCodes.Status204NoContent);
                }
                else
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
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
