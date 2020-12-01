using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using AutoMapper;

namespace Application.Answers
{
    public class List
    {
        public class Query : IRequest<List<AnswerDto>> { }

        public class Handler : IRequestHandler<Query, List<AnswerDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<List<AnswerDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var answers = await _context.Answers.ToListAsync();

                return _mapper.Map<List<Answer>, List<AnswerDto>>(answers);
            }
        }
    }
}