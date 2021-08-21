//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

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
    [Route("[controller]")]
    public class InspectionTypeController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<InspectionTypeController> _logger;

        /// <summary>
        /// Initializes a new instance of InspectionTypeController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// /// <param name="logger">logger object</param>
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
        /// <param name="body">inspection type to create</param>
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
                if (dto == null)
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
                if (result != null)
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

        [HttpPut("{id:int}")]
        public async Task<ActionResult<InspectionTypeDto>> UpdateInspectionType(InspectionTypeDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update inspection type {dto.InspectionTypeId}");
                if (!_repository.InspectionTypeExists(dto.InspectionTypeId))
                {
                    return NotFound($"Type with Id = {dto.InspectionTypeId} not found");
                }
                return await _repository.UpdateInspectionTypeAsync(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<InspectionTypeDto>> DeleteInspectionTypeAsync(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete inspection type {id}");
                if (!_repository.InspectionTypeExists(id))
                {
                    return NotFound($"type with Id = {id} not found");
                }
                return await _repository.DeleteInspectionTypeAsync(id);
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
