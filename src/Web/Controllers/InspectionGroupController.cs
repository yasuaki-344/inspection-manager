//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System;
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
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="503">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/inspection-groups")]
        public ActionResult<InspectionGroupDto> GetAllGroups()
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

        [HttpGet("{id:int}")]
        [Route("[controller]")]
        public ActionResult<InspectionGroupDto> GetInspectionGroup(int id)
        {
            try
            {
                _logger.LogInformation($"try to get inspection group {id}");

                var result = _repository.GetInspectionGroup(id);
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

        /// <summary>
        /// Create a new InspectionGroup model
        /// </summary>
        /// <param name="body">inspection group to create</param>
        /// <response code="202">正常系（非同期）Accepted</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpPost]
        [Route("/v1/inspection-groups")]
        public async Task<ActionResult<InspectionGroupDto>> CreateGroup([FromBody]InspectionGroupDto? dto)
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

        [HttpPut("{id:int}")]
        [Route("[controller]")]
        public async Task<ActionResult<InspectionGroupDto>> UpdateInspectionGroup(InspectionGroupDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update inspection group {dto.InspectionGroupId}");
                if (!_repository.InspectionGroupExists(dto.InspectionGroupId))
                {
                    return NotFound($"Group with Id = {dto.InspectionGroupId} not found");
                }
                return await _repository.UpdateInspectionGroupAsync(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:int}")]
        [Route("[controller]")]
        public async Task<ActionResult<InspectionGroupDto>> DeleteInspectionGroupAsync(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete inspection group {id}");
                if (!_repository.InspectionGroupExists(id))
                {
                    return NotFound($"group with Id = {id} not found");
                }
                return await _repository.DeleteInspectionGroupAsync(id);
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
