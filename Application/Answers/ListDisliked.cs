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
                var queryable = _context.DislikedAnswers.AsQueryable();
                queryable = queryable.Where(x => x.User.UserName == _userAccessor.GetCurrentUsername());
                var answers = await queryable.ToListAsync();

                List<string> result = new List<string>();
                foreach (var answer in answers)
                {
                    result.Add(answer.AnswerId);
                }

                return result;
            }
        }
    }
}