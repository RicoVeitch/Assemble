using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Application.Answers
{
    public class List
    {
        public class Query : IRequest<List<Answer>> { }

        public class Handler : IRequestHandler<Query, List<Answer>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Answer>> Handle(Query request, CancellationToken cancellationToken)
            {
                var answer = await _context.Answers.ToListAsync();

                return answer;
            }
        }
    }
}