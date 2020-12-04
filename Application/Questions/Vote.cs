using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Errors;
using System.Net;

namespace Application.Questions
{
    public class Vote
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public short Offset { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Offset).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                question.Likes = question.Likes + request.Offset;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}