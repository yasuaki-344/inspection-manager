using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Text.Encodings;
using System.Text.Encodings.Web;
using System.Text.Json;
using System.Text.Unicode;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
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

    [HttpGet]
    [Route("/v1/json-inspection-sheets/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult? ExportJson([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to export json inspection sheet {id}");
                if (_repository.InspectionSheetExists(id.Value))
                {
                    var sheet = _repository.GetInspectionSheet(id.Value);
                    var data = ConvertInspectionSheetDtoToJson(sheet);
                    return File(data, "application/json", $"{sheet?.SheetName}.json");
                }
                else
                {
                    return NotFound($"Sheet with Id = {id} not found");
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

    private byte[] ConvertInspectionSheetDtoToJson(InspectionSheetDetailDto sheet)
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
