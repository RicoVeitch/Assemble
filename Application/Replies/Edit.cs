using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Interfaces;
using Application.Errors;
using System.Net;

namespace Application.Replies
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Message { get; set; }
        }
        // validator for the command class. Sits inbetween command and handler for mediator.
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Message).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var reply = await _context.AnswerReplies.FindAsync(request.Id);

                if (reply == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { answer = "answer not found" });
                }

                reply.Message = request.Message;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}