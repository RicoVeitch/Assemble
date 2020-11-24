using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace Application.Questions
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                    throw new Exception("Requested question to delete does not exist.");
                }

                _context.Remove(question);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}