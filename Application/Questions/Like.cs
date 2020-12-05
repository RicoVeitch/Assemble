using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;
using FluentValidation;
using Application.Errors;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Application.Interfaces;
using Domain;

namespace Application.Questions
{
    public class Like
    {
        public class Command : IRequest<int>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, int>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<int> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                var dislikedQuestion = await _context.DislikedQuestions.FindAsync(question.Id, user.Id);
                if (dislikedQuestion != null)
                {
                    question.Likes += 1;
                    _context.DislikedQuestions.Remove(dislikedQuestion);
                }


                var likedQuestion = await _context.LikedQuestions.FindAsync(question.Id, user.Id);
                if (likedQuestion == null)
                {
                    question.Likes += 1;
                    likedQuestion = new LikedQuestion
                    {
                        Question = question,
                        User = user
                    };
                    _context.LikedQuestions.Add(likedQuestion);
                }
                else
                {
                    question.Likes -= 1;
                    _context.LikedQuestions.Remove(likedQuestion);
                }

                // if like question -> if already like remove the entry, else like it.

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return question.Likes;

                throw new Exception("Error in saving changes");
            }
        }
    }
}