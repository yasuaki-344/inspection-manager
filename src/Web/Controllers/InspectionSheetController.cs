using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using System.Web;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
[Route("/api/v1/inspection-sheets")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class InspectionSheetController : ControllerBase
{
    private readonly IInspectionSheetService _service;
    private readonly ILogger<InspectionSheetController> _logger;

    /// <summary>
    /// Initializes a new instance of InspectionSheetController class.
    /// </summary>
    /// <param name="service">Inspection sheet CRUD service object</param>
    /// <param name="logger">logger object</param>
    public InspectionSheetController(
        IInspectionSheetService service,
        ILogger<InspectionSheetController> logger
    )
    {
        _service = service;
        _logger = logger;
    }

    /// <summary>
    /// 点検シートの一覧を取得する
    /// </summary>
    /// <returns>点検シートの一覧</returns>
    /// <response code="200">取得に成功</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionSheetDto[]))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetAllInspectionSheets()
    {
        try
        {
            _logger.LogInformation("try to get all inspection sheet");
            var sheets = _service.GetAllInspectionSheets();
            return Ok(sheets);
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
    /// 点検シートを作成する
    /// </summary>
    /// <param name="dto">作成用点検シートデータ</param>
    /// <returns>作成した点検シートデータ</returns>
    /// <response code="201">作成に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionSheetDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateSheetAsync([Required][FromBody] InspectionSheetDto dto)
    {
        try
        {
            _logger.LogInformation("try to create inspection sheet");
            if (!_service.IsValidInspectionSheet(dto))
            {
                return BadRequest();
            }

            var result = await _service.CreateInspectionSheetAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionSheet),
                new { id = result.SheetId },
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

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(InspectionSheetDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult GetInspectionSheet([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to get inspection sheet {id}");
            if (!_service.InspectionSheetExists(id))
            {
                return NotFound($"sheet with Id = {id} not found");
            }

            var result = _service.GetInspectionSheet(id);
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
    /// 指定の点検シートを更新する
    /// </summary>
    /// <param name="id">指定の点検シートに紐づくID</param>
    /// <param name="dto">更新用点検シートデータ</param>
    /// <returns>指定の点検シート</returns>
    /// <response code="201">更新に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(InspectionSheetDto))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateInspectionSheetAsync(
        [Required][FromRoute] int id,
        [Required][FromBody] InspectionSheetDto dto)
    {
        try
        {
            _logger.LogInformation($"try to update inspection sheet {id}");
            if (id != dto.SheetId)
            {
                return BadRequest("Invalid ID supplied");
            }

            if (!_service.IsValidInspectionSheet(dto))
            {
                return BadRequest();
            }

            if (!_service.InspectionSheetExists(id))
            {
                return NotFound($"Sheet with Id = {dto.SheetId} not found");
            }
            var result = await _service.UpdateInspectionSheetAsync(dto);
            return CreatedAtAction(
                nameof(GetInspectionSheet),
                new { sheetId = result.SheetId },
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
    /// 指定の点検シートを削除する
    /// </summary>
    /// <param name="id">指定の点検シートに紐づくID</param>
    /// <returns>削除した点検シートデータ</returns>
    /// <response code="204">削除に成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteInspectionSheetAsync([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to delete inspection sheet {id}");
            if (!_service.InspectionSheetExists(id))
            {
                return NotFound($"sheet with Id = {id} not found");
            }

            await _service.DeleteInspectionSheetAsync(id);
            return NoContent();
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

