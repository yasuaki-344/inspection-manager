//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

using System;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        [HttpGet]
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

        [HttpPost]
        public ActionResult<InspectionGroupDto> CreateGroup(InspectionGroupDto? dto)
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
                    var result = _repository.CreateInspectionGroup(dto);
                    return CreatedAtAction(nameof(GetInspectionGroup),
                    new { id = result.InspectionGroupId }, result);
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
        public ActionResult<InspectionGroupDto> UpdateInspectionGroup(InspectionGroupDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update inspection group {dto.InspectionGroupId}");
                if (!_repository.InspectionGroupExists(dto.InspectionGroupId))
                {
                    return NotFound($"Group with Id = {dto.InspectionGroupId} not found");
                }
                return _repository.UpdateInspectionGroup(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult<InspectionGroupDto> DeleteInspectionGroup(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete inspection group {id}");
                if (!_repository.InspectionGroupExists(id))
                {
                    return NotFound($"group with Id = {id} not found");
                }
                return _repository.DeleteInspectionGroup(id);
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
