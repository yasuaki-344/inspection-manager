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
    public class ChoiceTemplateController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly ILogger<ChoiceTemplateController> _logger;

        /// <summary>
        /// Initializes a new instance of ChoiceTemplateController class.
        /// </summary>
        /// <param name="repository">repository object</param>
        /// /// <param name="logger">logger object</param>
        public ChoiceTemplateController(
            ICategoryRepository repository,
            ILogger<ChoiceTemplateController> logger
        )
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public ActionResult<ChoiceTemplateDto> GetAllChoiceTemplates()
        {
            try
            {
                _logger.LogInformation("try to get all choice template");
                var types = _repository.GetChoiceTemplates();
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
        public ActionResult<ChoiceTemplateDto> CreateChoiceTemplates(
            IEnumerable<ChoiceTemplateDto>? templates)
        {
            try
            {
                _logger.LogInformation("try to create choice templates");
                if (templates == null)
                {
                    return BadRequest();
                }
                else
                {
                    var result = _repository.CreateChoiceTemplates(templates);
                    return CreatedAtAction(nameof(GetAllChoiceTemplates), result);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error creating new choice templates"
                );
            }
        }
    }
}
