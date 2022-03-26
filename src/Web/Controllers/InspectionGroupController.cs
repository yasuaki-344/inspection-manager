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
[Route("/api/v1/inspection-groups")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
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
    /// 点検グループの一覧を取得する
    /// </summary>
    /// <returns>点検グループの一覧</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetAllInspectionGroups()
    {
        try
        {
            _logger.LogInformation("try to get all inspection groups");
            var groups = _repository.GetInspectionGroups();
            Response.Headers.ContentRange = groups.Count().ToString();
            return Ok(groups);
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
    /// 点検グループを作成する
    /// </summary>
    /// <param name="dto">作成用点検グループデータ</param>
    /// <returns>作成した点検グループデータ</returns>
    /// <response code="201">作成に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateInspectionGroupAsync([Required][FromBody] InspectionGroupDto dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection group");
            var result = await _repository.CreateInspectionGroupAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionGroupById),
                new { id = result.InspectionGroupId },
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
    /// 指定の点検グループを取得する
    /// </summary>
    /// <param name="id">指定の点検グループに紐づくID</param>
    /// <returns>指定の点検グループ</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetInspectionGroupById([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to get inspection group {id}");
            if (!_repository.InspectionGroupExists(id))
            {
                return NotFound($"group with Id = {id} not found");
            }

            var result = _repository.GetInspectionGroup(id);
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
    /// 指定の点検グループを更新する
    /// </summary>
    /// <param name="id">指定の点検グループに紐づくID</param>
    /// <param name="dto">更新用点検グループデータ</param>
    /// <returns>指定の点検グループ</returns>
    /// <response code="201">更新に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionGroupAsync(
        [Required][FromRoute] int id,
        [Required][FromBody] InspectionGroupDto dto
    )
    {
        try
        {
            _logger.LogInformation($"try to update inspection group {dto.InspectionGroupId}");
            if (id != dto.InspectionGroupId)
            {
                return BadRequest("Invalid ID supplied");
            }

            if (!_repository.InspectionGroupExists(dto.InspectionGroupId))
            {
                return NotFound($"Group with Id = {dto.InspectionGroupId} not found");
            }

            var result = await _repository.UpdateInspectionGroupAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionGroupById),
                new { id = result.InspectionGroupId },
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
    /// 指定の点検グループを削除する
    /// </summary>
    /// <param name="id">指定の点検グループに紐づくID</param>
    /// <returns>削除した点検グループデータ</returns>
    /// <response code="200">削除に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpDelete("{id}")]
    [Consumes(MediaTypeNames.Text.Plain)]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionGroupDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteInspectionGroupAsync([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to delete inspection group {id}");
            if (!_repository.InspectionGroupExists(id))
            {
                return NotFound($"group with Id = {id} not found");
            }
            var dto = await _repository.DeleteInspectionGroupAsync(id);
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

