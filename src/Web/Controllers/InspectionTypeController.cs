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

        [HttpGet]
        public ActionResult<InspectionTypeDto> GetAllTypes()
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

        [HttpGet("{id:int}")]
        public ActionResult<InspectionTypeDto> GetInspectionType(int id)
        {
            try
            {
                _logger.LogInformation($"try to get inspection type {id}");

                var result = _repository.GetInspectionType(id);
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
        public async Task<ActionResult<InspectionTypeDto>> CreateType(InspectionTypeDto? dto)
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
