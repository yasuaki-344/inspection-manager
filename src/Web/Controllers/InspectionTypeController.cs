using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mime;
using System.Threading.Tasks;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
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
        public IActionResult GetAllTypes()
        {
            try
            {
                _logger.LogInformation("try to get all inspection types");
                var types = _repository.GetInspectionTypes();
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
        public async Task<IActionResult> CreateType(InspectionTypeDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create inspection type");
                if (dto is null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _repository.CreateInspectionTypeAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionType),
                    new { id = result.InspectionTypeId }, result);
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
        /// Get InspectionType model by ID.
        /// </summary>
        /// <param name="inspectionTypeId">inspection type ID to get</param>
        /// <response code="200">A single InspectionType model</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="404">対象リソースが存在しない Not Found</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/inspection-types/{inspectionTypeId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetInspectionType(int inspectionTypeId)
        {
            try
            {
                _logger.LogInformation($"try to get inspection type {inspectionTypeId}");
                var result = _repository.GetInspectionType(inspectionTypeId);
                if (result is not null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound($"type with Id = {inspectionTypeId} not found");
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
        /// Updates the InspectionType model.
        /// </summary>
        /// <param name="inspectionTypeId">inspection type ID to update</param>
        /// <param name="dto">inspection type to update</param>
        /// <response code="201">正常系（非同期）Created</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPut]
        [Route("/v1/inspection-types/{inspectionGroupId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> UpdateInspectionTypeAsync([FromRoute][Required] int? inspectionGroupId, [FromBody] InspectionTypeDto dto)
        {
            try
            {
                if (inspectionGroupId.HasValue)
                {
                    _logger.LogInformation($"try to update inspection type {dto.InspectionTypeId}");
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
        /// <param name="inspectionTypeId">inspection type ID to delete</param>
        /// <response code="204">No Content</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpDelete]
        [Route("/v1/inspection-types/{inspectionTypeId}")]
        [Consumes(MediaTypeNames.Application.Json)]
        public async Task<IActionResult> DeleteInspectionTypeAsync([FromRoute][Required] int? inspectionTypeId)
        {
            try
            {
                if (inspectionTypeId.HasValue)
                {
                    _logger.LogInformation($"try to delete inspection type {inspectionTypeId}");
                    if (!_repository.InspectionTypeExists(inspectionTypeId.Value))
                    {
                        return NotFound($"type with Id = {inspectionTypeId} not found");
                    }
                    await _repository.DeleteInspectionTypeAsync(inspectionTypeId.Value);
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
