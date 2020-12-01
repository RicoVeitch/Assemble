using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Interfaces;

namespace Application.Answers
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string QuestionId { get; set; }
            public string Message { get; set; }
        }
        // validator for the command class. Sits inbetween command and handler for mediator.
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.QuestionId).NotEmpty();
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
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername()); // get currently logged in usery
                var question = await _context.Questions.FindAsync(request.QuestionId);

                var answer = new Answer
                {
                    Id = request.Id,
                    Message = request.Message,
                    Author = user,
                    Question = question,
                    CreatedAt = DateTime.Now,
                };

                user.Answers.Add(answer);
                question.Answers.Add(answer);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}