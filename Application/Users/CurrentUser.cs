using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Users
{
    public class CurrentUser
    {
        public class Query : IRequest<UserDto> { }

        public class Handler : IRequestHandler<Query, UserDto>
        {
            private readonly UserManager<User> _userManager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _userAccessor;
            public Handler(UserManager<User> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _jwtGenerator = jwtGenerator;
                _userManager = userManager;
            }

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUsername());

                if (user == null)
                    throw new RestException(HttpStatusCode.Unauthorized, new { Errors = "User does not exist" });

                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Token = _jwtGenerator.CreateToken(user)
                };
            }
        }
    }
}