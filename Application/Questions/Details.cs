using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Questions
{
    public class Details
    {
        public class Query : IRequest<QuestionDto>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, QuestionDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<QuestionDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                return _mapper.Map<Question, QuestionDto>(question);
                // var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                // if (user != null)
                // {
                //     var liked = await _context.LikedQuestions.FindAsync(question.Id, user.Id);
                //     var disliked = await _context.DislikedQuestions.FindAsync(question.Id, user.Id);
                //     bool? upvote = null;

                //     if (liked != null)
                //     {
                //         upvote = true;
                //     }
                //     else if (disliked != null)
                //     {
                //         upvote = false;
                //     }
                //     result.Liked = upvote;
                //     return result;
                // }
                // return result;
            }
        }
    }
}