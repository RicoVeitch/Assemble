using System.Collections.Generic;
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
    public class List
    {
        public class Query : IRequest<List<QuestionDto>> { }

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
                var questions = await _context.Questions.ToListAsync();

                return _mapper.Map<List<Question>, List<QuestionDto>>(questions);
            }
        }
    }
}