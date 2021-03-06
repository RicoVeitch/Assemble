using System.Collections.Generic;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Answers;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnswerController
    {
        private readonly IMediator _mediator;
        public AnswerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("liked")]
        [Authorize]
        public async Task<ActionResult<List<string>>> ListLiked()
        {
            return await _mediator.Send(new ListLiked.Query());
        }

        [HttpGet("disliked")]
        [Authorize]
        public async Task<ActionResult<List<string>>> ListDisliked()
        {
            return await _mediator.Send(new ListDisliked.Query());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
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

        [HttpPut("like/{id}")]
        [Authorize]
        public async Task<ActionResult<int>> Like(string id)
        {
            return await _mediator.Send(new Like.Command { Id = id });
        }

        [HttpPut("dislike/{id}")]
        [Authorize]
        public async Task<ActionResult<int>> Dislike(string id)
        {
            return await _mediator.Send(new Dislike.Command { Id = id });
        }


        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        }


    }
}