using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mime;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
[Route("/api/v1/json-inspection-sheets")]
[Consumes(MediaTypeNames.Application.Json)]
[Produces(MediaTypeNames.Application.Json)]
public class JsonExportController : ControllerBase
{
    private readonly IInspectionSheetRepository _repository;
    private readonly IMapper _mapper;
    private readonly ILogger<JsonExportController> _logger;

    /// <summary>
    /// Initializes a new instance of JsonExportController class.
    /// </summary>
    /// <param name="repository">Repository object</param>
    /// <param name="mapper">Auto mapper object</param>
    /// <param name="logger">logger object</param>
    public JsonExportController(
        IInspectionSheetRepository repository,
        IMapper mapper,
        ILogger<JsonExportController> logger
    )
    {
        _repository = repository;
        _mapper = mapper;
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
    public IActionResult ExportJson([Required][FromRoute] int id)
    {
        try
        {
            _logger.LogInformation($"try to export json inspection sheet {id}");
            if (!_repository.InspectionSheetExists(id))
            {
                return NotFound($"Sheet with Id = {id} not found");
            }

            var sheet = _repository.GetInspectionSheet(id);
            var data = ConvertInspectionSheetDtoToJson(sheet);
            return File(data, MediaTypeNames.Application.Json, $"{sheet.SheetName}.json");
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

    private byte[] ConvertInspectionSheetDtoToJson(InspectionSheetDto sheet)
    {
        var options = new JsonSerializerOptions();
        options.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
        var dto = _mapper.Map<InspectionSheetExportDto>(sheet);

        dto.InspectionType = _repository.InspectionTypeName(sheet.InspectionTypeId);
        dto.InspectionGroup = _repository.InspectionGroupName(sheet.InspectionGroupId);

        for (var i = 0; i < dto.Equipments.Count; i++)
        {
            var isLastEquipment = (i == dto.Equipments.Count - 1);
            foreach (var (item, index) in dto.Equipments[i].InspectionItems.Select((x, j) => (x, j)))
            {
                var isLastInspectionItem = (index == dto.Equipments[i].InspectionItems.Count - 1);
                item.InspectionItemId = index;
                if (isLastInspectionItem)
                {
                    if (!isLastEquipment)
                    {
                        item.Transitions.Add(new TransitionExportDto
                        {
                            SheetId = dto.SheetId,
                            EquipmentId = dto.Equipments[i + 1].EquipmentId,
                            InspectionItemId = 0,
                        });
                    }
                }
                else
                {
                    item.Transitions.Add(new TransitionExportDto
                    {
                        SheetId = dto.SheetId,
                        EquipmentId = dto.Equipments[i].EquipmentId,
                        InspectionItemId = item.InspectionItemId + 1,
                    });
                }
            }
        }
        var json = JsonSerializer.Serialize(
            new InspectionExportDto { Sheet = dto, },
            options
        );
        var data = System.Text.Encoding.UTF8.GetBytes(json);
        return data;
    }
}
