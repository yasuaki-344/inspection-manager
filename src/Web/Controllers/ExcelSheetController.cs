using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Net.Mime;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
[Route("/api/v1/excel-inspection-sheets")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class ExcelSheetController : ControllerBase
{
    private readonly IExcelDownloadService _service;
    private readonly ILogger<ExcelSheetController> _logger;

    /// <summary>
    /// Initializes a new instance of ExcelSheetController class.
    /// </summary>
    /// <param name="service">Excel download service object</param>
    /// <param name="logger">logger object</param>
    public ExcelSheetController(
        IExcelDownloadService service,
        ILogger<ExcelSheetController> logger
    )
    {
        _service = service;
        _logger = logger;
    }

    /// <summary>
    /// エクセル形式で点検シートをダウンロードする
    /// </summary>
    /// <param name="id"></param>
    /// <returns>エクセル形式の点検シート</returns>
    /// <response code="200">ダウンロードに成功</response>
    /// <response code="400">リクエストエラー</response>
    /// <response code="404">対象リソースが存在しない</response>
    /// <response code="500">サーバー内部エラー</response>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(FileResult))]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult DownloadExcelSheet([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to download inspection sheet {id}");
            if (!_service.InspectionSheetExists(id))
            {
                return NotFound($"Sheet with Id = {id} not found");
            }

            var sheet = _service.CreateXlsx(id);
            using (var ms = new MemoryStream())
            {
                sheet.Write(ms);
                return File(
                    ms.ToArray(),
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "sample.xlsx"
                );
            }
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
