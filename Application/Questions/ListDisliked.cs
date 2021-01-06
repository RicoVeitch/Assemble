using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;

namespace Application.Questions
{
    public class ListDisliked
    {
        public class Query : IRequest<List<string>> { }

        public class Handler : IRequestHandler<Query, List<string>>
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

            public async Task<List<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.DislikedQuestions.Where(lq => lq.User.UserName == _userAccessor.GetCurrentUsername()).Select(d => d.QuestionId).ToListAsync();
            }
        }
    }
}