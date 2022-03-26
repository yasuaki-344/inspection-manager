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

namespace InspectionManager.Web.Controllers;

[ApiController]
[Route("/api/v1/choice-templates")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
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
    /// 点検種別の一覧を取得する
    /// </summary>
    /// <returns>点検種別の一覧</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto[]))]
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
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Internal Sever Error"
            );
        }
    }

    /// <summary>
    /// 点検種別を作成する
    /// </summary>
    /// <param name="dto">作成用点検種別データ</param>
    /// <returns>作成した点検種別データ</returns>
    /// <response code="201">作成に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ChoiceTemplateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateChoiceTemplateAsync([Required][FromBody] ChoiceTemplateDto dto)
    {
        try
        {
            _logger.LogInformation("try to create choice template");
            var result = await _repository.CreateChoiceTemplateAsync(dto);
            return CreatedAtAction(
                nameof(GetChoiceTemplateById),
                new { id = result.ChoiceTemplateId },
                result
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Internal Sever Error"
            );
        }
    }

    /// <summary>
    /// 指定の点検種別を取得する
    /// </summary>
    /// <param name="id">指定の点検種別に紐づくID</param>
    /// <returns>指定の点検種別</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetChoiceTemplateById([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to get choice template {id}");
            if (!_repository.ChoiceTemplateExists(id))
            {
                return NotFound($"template with Id = {id} not found");
            }

            var result = _repository.GetChoiceTemplate(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Internal Sever Error"
            );
        }
    }

    /// <summary>
    /// 指定の点検種別を更新する
    /// </summary>
    /// <param name="id">指定の点検種別に紐づくID</param>
    /// <param name="dto">更新用点検種別データ</param>
    /// <returns>指定の点検種別</returns>
    /// <response code="201">更新に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPut("{id}")]
    [Route("/v1/choice-templates/{id}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ChoiceTemplateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateChoiceTemplateAsync(
        [Required][FromRoute] int id,
        [Required][FromBody] ChoiceTemplateDto dto)
    {
        try
        {
            _logger.LogInformation($"try to update choice template {dto.ChoiceTemplateId}");
            if (id != dto.ChoiceTemplateId)
            {
                return BadRequest("Invalid ID supplied");
            }

            if (!_repository.ChoiceTemplateExists(dto.ChoiceTemplateId))
            {
                return NotFound($"Template with Id = {dto.ChoiceTemplateId} not found");
            }

            var result = await _repository.UpdateChoiceTemplateAsync(dto);
            return CreatedAtAction(
                nameof(GetChoiceTemplateById),
                new { id = result.ChoiceTemplateId },
                result
            );

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Internal Sever Error"
            );
        }
    }

    /// <summary>
    /// 指定の点検種別を削除する
    /// </summary>
    /// <param name="id">指定の点検種別に紐づくID</param>
    /// <returns>削除した点検種別データ</returns>
    /// <response code="200">削除に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpDelete("{id}")]
    [Consumes(MediaTypeNames.Text.Plain)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ChoiceTemplateDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteChoiceTemplateAsync([FromRoute][Required] int id)
    {
        try
        {
            _logger.LogInformation($"try to delete choice template {id}");
            if (!_repository.ChoiceTemplateExists(id))
            {
                return NotFound($"choice template with Id = {id} not found");
            }

            var dto = await _repository.DeleteChoiceTemplateAsync(id);
            return Ok(dto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return StatusCode(
                StatusCodes.Status500InternalServerError,
                "Internal Sever Error"
            );
        }
    }
}
