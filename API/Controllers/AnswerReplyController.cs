using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Replies;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerReplyController
    {
        private readonly IMediator _mediator;
        public AnswerReplyController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Reply(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Edit(string id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }
    }
}