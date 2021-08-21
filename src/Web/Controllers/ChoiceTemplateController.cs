﻿using System;
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
    public class ChoiceTemplateController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<ChoiceTemplateController> _logger;

        /// <summary>
        /// Initializes a new instance of ChoiceTemplateController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// <param name="logger">logger object</param>
        public ChoiceTemplateController(
            ICategoryRepository repository,
            ILogger<ChoiceTemplateController> logger
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
        [Route("/v1/choice-templates")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetAllChoiceTemplates()
        {
            try
            {
                _logger.LogInformation("try to get all choice template");
                var types = _repository.GetChoiceTemplates();
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
        /// Create a new ChoiceTemplate model
        /// </summary>
        /// <param name="dto">Choice template to create</param>
        /// <response code="201">正常系（非同期）Created</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpPost]
        [Route("/v1/choice-templates")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateChoiceTemplate(ChoiceTemplateDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create choice template");
                if (dto == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _repository.CreateChoiceTemplateAsync(dto);
                    return CreatedAtAction(nameof(GetChoiceTemplate),
                    new { id = result.ChoiceTemplateId }, result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new choice template"
                );
            }
        }

        /// <summary>
        /// Get ChoiceTemplate model by ID.
        /// </summary>
        /// <param name="choiceTemplateId">Choice template ID to get</param>
        /// <response code="200">A single ChoiceTemplate model</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="404">対象リソースが存在しない Not Found</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/choice-templates/{choiceTemplateId}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetChoiceTemplate(int choiceTemplateId)
        {
            try
            {
                _logger.LogInformation($"try to get choice template {choiceTemplateId}");
                var result = _repository.GetChoiceTemplate(choiceTemplateId);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound($"template with Id = {choiceTemplateId} not found");
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
        [Route("[controller]")]
        public async Task<ActionResult<ChoiceTemplateDto>> UpdateChoiceTemplate(ChoiceTemplateDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update choice template {dto.ChoiceTemplateId}");
                if (!_repository.ChoiceTemplateExists(dto.ChoiceTemplateId))
                {
                    return NotFound($"Template with Id = {dto.ChoiceTemplateId} not found");
                }
                return await _repository.UpdateChoiceTemplateAsync(dto);
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
        public async Task<ActionResult<ChoiceTemplateDto>> DeleteChoiceTemplateAsync(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete choice template {id}");
                if (!_repository.ChoiceTemplateExists(id))
                {
                    return NotFound($"choice template with Id = {id} not found");
                }
                return await _repository.DeleteChoiceTemplateAsync(id);
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
