//
// Copyright (c) 2021 Yasuaki Miyoshi
//
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

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
    public class InspectionTypeController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<InspectionTypeController> _logger;

        /// <summary>
        /// Initializes a new instance of InspectionTypeController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// /// <param name="logger">logger object</param>
        public InspectionTypeController(
            ICategoryRepository repository,
            ILogger<InspectionTypeController> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<string[]> GetAllTypes()
        {
            try
            {
                _logger.LogInformation("try to get all inspection types");
                var types = _repository.GetInspectionTypes();
                return Ok(types);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpPost]
        public ActionResult<string[]> CreateTypes(string[]? types)
        {
            try
            {
                _logger.LogInformation("try to create inspection types");
                if (types == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = _repository.CreateInspectionTypes(types);
                    return CreatedAtAction(nameof(GetAllTypes), result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new inspection types"
                );
            }
        }
    }
}
