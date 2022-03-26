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
[Route("/api/v1/inspection-types")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
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
    /// 点検種別の一覧を取得する
    /// </summary>
    /// <returns>点検種別の一覧</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto[]))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetAllInspectionTypes()
    {
        try
        {
            _logger.LogInformation("try to get all inspection types");
            var types = _repository.GetInspectionTypes();
            Response.Headers.ContentRange = types.Count().ToString();
            return Ok(types);
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
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateInspectionTypeAsync([Required][FromBody] InspectionTypeDto dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection type");
            var result = await _repository.CreateInspectionTypeAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionTypeById),
                new { id = result.InspectionTypeId },
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetInspectionTypeById([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to get inspection type {id}");
            if (!_repository.InspectionTypeExists(id))
            {
                return NotFound($"type with Id = {id} not found");
            }

            var result = _repository.GetInspectionType(id);
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
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionTypeAsync(
        [Required][FromRoute] int id,
        [Required][FromBody] InspectionTypeDto dto
    )
    {
        try
        {
            _logger.LogInformation($"try to update inspection type {dto.InspectionTypeId}");
            if (id != dto.InspectionTypeId)
            {
                return BadRequest("Invalid ID supplied");
            }

            if (!_repository.InspectionTypeExists(dto.InspectionTypeId))
            {
                return NotFound($"Type with Id = {dto.InspectionTypeId} not found");
            }

            var result = await _repository.UpdateInspectionTypeAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionTypeById),
                new { id = result.InspectionTypeId }, result
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
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionTypeDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteInspectionTypeAsync([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to delete inspection type {id}");
            if (!_repository.InspectionTypeExists(id))
            {
                return NotFound($"type with Id = {id} not found");
            }

            var dto = await _repository.DeleteInspectionTypeAsync(id);
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

