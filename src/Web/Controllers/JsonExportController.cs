//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
using System;
using System.Collections.Generic;
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

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        [HttpGet("{id:guid}")]
        public IActionResult ExportJson(string id)
        {
            try
            {
                _logger.LogInformation($"try to export inspection sheet {id}");
                if (!_repository.InspectionSheetExists(id))
                {
                    return NotFound($"Sheet with Id = {id} not found");
                }
                else
                {
                    var sheet = _repository.GetInspectionSheet(id);
                    if (sheet != null)
                    {
                        var options = new JsonSerializerOptions();
                        options.Encoder = JavaScriptEncoder.Create(UnicodeRanges.All);
                        var dto = _mapper.Map<InspectionSheetExportDto>(sheet);
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
                        return File(data, "application/json", $"{sheet?.SheetName}.json");
                    }
                    else
                    {
                        return NotFound($"Sheet with Id = {id} not found");
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }
    }
}
