using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers;

[ApiController]
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

    [HttpGet]
    [Route("/v1/excel-inspection-sheets/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public IActionResult DownloadExcelSheet([FromRoute][Required] int? id)
    {
        try
        {
            if (id is not null)
            {
                _logger.LogInformation($"try to download inspection sheet {id}");
                if (_service.InspectionSheetExists(id.Value))
                {
                    var sheet = _service.CreateXlsx(id.Value);
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
}
