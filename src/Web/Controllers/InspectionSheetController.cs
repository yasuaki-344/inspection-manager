using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using InspectionManager.ApplicationCore.Dto;
using InspectionManager.ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InspectionManager.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

        [HttpGet]
        public ActionResult<InspectionSheetDto> GetAllInspectionSheets()
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
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpGet("{id:int}")]
        public ActionResult<InspectionSheetDto> GetInspectionSheet(int id)
        {
            try
            {
                _logger.LogInformation($"try to get inspection sheet {id}");

                var result = _service.GetInspectionSheet(id);
                if (result == null)
                {
                    return NotFound();
                }
                else
                {
                    return result;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        [HttpPost]
        public async Task<ActionResult<InspectionSheetDto>> CreateSheetAsync(InspectionSheetDto? dto)
        {
            try
            {
                _logger.LogInformation("try to create inspection sheet");
                if (dto == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = await _service.CreateInspectionSheetAsync(dto);
                    return CreatedAtAction(nameof(GetInspectionSheet),
                    new { id = result.SheetId }, result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new inspection sheet"
                );
            }
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<InspectionSheetDto>> UpdateInspectionSheet(InspectionSheetDto dto)
        {
            try
            {
                _logger.LogInformation($"try to update inspection sheet {dto.SheetId}");
                if (!_service.InspectionSheetExists(dto.SheetId))
                {
                    return NotFound($"Sheet with Id = {dto.SheetId} not found");
                }
                return await _service.UpdateInspectionSheetAsync(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error updating data");
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<InspectionSheetDto>> DeleteInspectionSheetAsync(int id)
        {
            try
            {
                _logger.LogInformation($"try to delete inspection sheet {id}");
                if (!_service.InspectionSheetExists(id))
                {
                    return NotFound($"sheet with Id = {id} not found");
                }
                return await _service.DeleteInspectionSheetAsync(id);
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
