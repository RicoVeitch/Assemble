using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using Application.Errors;
using System.Net;
using Application.Interfaces;

namespace Application.Replies
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
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var reply = await _context.AnswerReplies.FindAsync(request.Id);

                if (reply == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { reply = "reply not found" });
                }

                _context.Remove(reply);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}