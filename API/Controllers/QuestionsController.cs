using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Application.Questions;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public QuestionsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Question>>> List()
        {
            return await _mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}
