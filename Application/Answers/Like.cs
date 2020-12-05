using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Errors;
using System.Net;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Answers
{
    public class Like
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
                var answer = await _context.Answers.FindAsync(request.Id);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                if (answer == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }


                var dislikedAnswer = await _context.DislikedAnswers.FindAsync(answer.Id, user.Id);
                if (dislikedAnswer != null)
                {
                    answer.Likes += 1;
                    _context.DislikedAnswers.Remove(dislikedAnswer);
                }

                var likedAnswer = await _context.LikedAnswers.FindAsync(answer.Id, user.Id);
                if (likedAnswer == null)
                {
                    answer.Likes += 1;
                    likedAnswer = new LikedAnswer
                    {
                        Answer = answer,
                        User = user
                    };
                    _context.LikedAnswers.Add(likedAnswer);
                }
                else
                {
                    answer.Likes -= 1;
                    _context.LikedAnswers.Remove(likedAnswer);
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}