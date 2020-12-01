using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using Application.Errors;
using System.Net;
using FluentValidation;

namespace Application.Questions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
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

                question.Title = request.Title ?? question.Title;
                question.Description = request.Description ?? question.Description;
                question.Category = request.Category ?? question.Category;
                question.Date = request.Date ?? question.Date;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}