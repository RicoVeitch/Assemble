using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {

        [HttpGet]
        public ActionResult<Question> Get()
        {
            return new Question
            {
                Id = new Guid(),
                Title = "test title",
                Description = "test Description",
                Date = DateTime.Now
            };
        }
    }
}
