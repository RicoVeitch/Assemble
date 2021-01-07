using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using FluentValidation;
using Application.Interfaces;

namespace Application.Replies
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string AnswerId { get; set; }
            public string Message { get; set; }
            public DateTime CreatedAt { get; set; }
        }
        // validator for the command class. Sits inbetween command and handler for mediator.
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.AnswerId).NotEmpty();
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
                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var answer = await _context.Answers.FindAsync(request.AnswerId);

                var answerReply = new AnswerReply
                {
                    Id = request.Id,
                    Message = request.Message,
                    Author = user,
                    Answer = answer,
                    CreatedAt = request.CreatedAt,
                };

                user.AnswersReplies.Add(answerReply);
                answer.Replies.Add(answerReply);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}