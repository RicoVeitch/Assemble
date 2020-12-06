using System;
using System.Collections.Generic;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Application.Questions;
using Microsoft.AspNetCore.Authorization;
// [Authorize]
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
        public async Task<ActionResult<List<QuestionDto>>> List(bool likedQuestions, bool unansweredQuestions, string categories)
        {
            return await _mediator.Send(new List.Query(likedQuestions, unansweredQuestions, categories));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<QuestionDto>> Details(string id)
        {
            return await _mediator.Send(new Details.Query { Id = id });
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
