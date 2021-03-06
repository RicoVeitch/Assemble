using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Errors;
using System.Net;
using Application.Interfaces;

namespace Application.Questions
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                foreach (var answer in question.Answers)
                {
                    foreach (var reply in answer.Replies)
                    {
                        _context.Remove(reply);
                    }
                    _context.Remove(answer);
                }

                _context.Remove(question);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}