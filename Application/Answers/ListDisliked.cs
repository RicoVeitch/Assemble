using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using AutoMapper;
using Application.Interfaces;
using System.Linq;

namespace Application.Answers
{
    public class ListDisliked
    {
        public class Query : IRequest<List<string>> { }

        public class Handler : IRequestHandler<Query, List<string>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<string>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.DislikedAnswers.Where(lq => lq.User.UserName == _userAccessor.GetCurrentUsername()).Select(d => d.AnswerId).ToListAsync();
            }
        }
    }
}