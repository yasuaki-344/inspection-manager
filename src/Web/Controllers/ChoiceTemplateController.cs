using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
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
                var templates = _repository.GetChoiceTemplates();
                Response.Headers.ContentRange = templates.Count().ToString();
                return Ok(templates);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        /// <summary>
        /// Get ChoiceTemplate model by ID.
        /// </summary>
        /// <param name="id">Choice template ID to get</param>
        /// <response code="200">A single ChoiceTemplate model</response>
        /// <response code="400">バリデーションエラー or 業務エラー Bad Request</response>
        /// <response code="404">対象リソースが存在しない Not Found</response>
        /// <response code="500">システムエラー Internal Server Error</response>
        [HttpGet]
        [Route("/v1/choice-templates/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public IActionResult GetChoiceTemplate([FromRoute][Required] int? id)
        {
            try
            {
                if (id is not null)
                {
                    _logger.LogInformation($"try to get choice template {id}");
                    if (_repository.ChoiceTemplateExists(id.Value))
                    {
                        var result = _repository.GetChoiceTemplate(id.Value);
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound($"template with Id = {id} not found");
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
        public async Task<IActionResult> CreateChoiceTemplateAsync(ChoiceTemplateDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create choice template");
                if (dto is not null)
                {
                    var result = await _repository.CreateChoiceTemplateAsync(dto);
                    return CreatedAtAction(nameof(GetChoiceTemplate),
                    new { id = result.ChoiceTemplateId }, result);
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
                    "Error creating new choice template"
                );
            }
        }

        /// <summary>
        /// Updates the ChoiceTemplate model.
        /// </summary>
        /// <param name="id">Choice template ID to update</param>
        /// <param name="dto">inspection type to update</param>
        /// <response code="201">正常系（非同期）Created</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpPut]
        [Route("/v1/choice-templates/{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateChoiceTemplateAsync([FromRoute][Required] int? id, [FromBody] ChoiceTemplateDto dto)
        {
            try
            {
                if (id is not null)
                {
                    _logger.LogInformation($"try to update choice template {dto.ChoiceTemplateId}");
                    if (id != dto.ChoiceTemplateId)
                    {
                        return BadRequest("Invalid ID supplied");
                    }

                    if (_repository.ChoiceTemplateExists(dto.ChoiceTemplateId))
                    {
                        var result = await _repository.UpdateChoiceTemplateAsync(dto);
                        return CreatedAtAction(nameof(GetChoiceTemplate),
                        new { id = result.ChoiceTemplateId }, result);
                    }
                    else
                    {
                        return NotFound($"Template with Id = {dto.ChoiceTemplateId} not found");
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
        /// Deletes the ChoiceTemplate model.
        /// </summary>
        /// <param name="id">Choice template ID to delete</param>
        /// <response code="200">Success</response>
        /// <response code="400">Invalid ID supplied</response>
        /// <response code="404">Not found</response>
        /// <response code="500">Internal Server Error</response>
        [HttpDelete]
        [Route("/v1/choice-templates/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteChoiceTemplateAsync([FromRoute][Required] int? id)
        {
            try
            {
                if (id is not null)
                {
                    _logger.LogInformation($"try to delete choice template {id}");
                    if (_repository.ChoiceTemplateExists(id.Value))
                    {
                        var dto = await _repository.DeleteChoiceTemplateAsync(id.Value);
                        return Ok(dto);
                    }
                    else
                    {
                        return NotFound($"choice template with Id = {id} not found");
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
}
