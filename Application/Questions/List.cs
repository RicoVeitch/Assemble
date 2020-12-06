using System.Collections.Generic;
using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Questions
{
    public class List
    {
        public class Query : IRequest<List<QuestionDto>>
        {
            public Query(bool likedQuestions, bool unansweredQuestions, string categories)
            {
                LikedQuestions = likedQuestions;
                UnansweredQuestions = unansweredQuestions;
                SelectedCategories = categories;

            }
            public bool LikedQuestions { get; set; }
            public bool UnansweredQuestions { get; set; }
            public string SelectedCategories { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<QuestionDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IUserAccessor userAccessor, IMapper mapper)
            {
                _mapper = mapper;
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<List<QuestionDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // var user = await _context.Users.SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetCurrentUsername());
                var queryable = _context.Questions.AsQueryable();

                if (request.SelectedCategories != null)
                {
                    string[] categories = request.SelectedCategories.Split('+');
                    foreach (var category in categories)
                    {
                        queryable = queryable.Where(x => x.QuestionCategories.Any(qc => qc.CategoryId == category));
                    }
                }

                if (request.LikedQuestions)
                {
                    queryable = queryable.Where(x => x.LikedQuestions.Any(lq => lq.User.UserName == _userAccessor.GetCurrentUsername()));
                }
                if (request.UnansweredQuestions)
                {
                    queryable = queryable.Where(x => x.Answers.Count == 0);
                }

                // var questions = await _context.Questions.ToListAsync();
                var questions = await queryable.ToListAsync();

                return _mapper.Map<List<Question>, List<QuestionDto>>(questions);
            }
        }
    }
}