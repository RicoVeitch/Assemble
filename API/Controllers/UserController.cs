using System;
using System.Collections.Generic;
using System.Linq;
using Domain;
using MediatR;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Application.Questions;
using Application.User;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(Login.Query query)
        {
            return await _mediator.Send(query);
        }
    }
}
