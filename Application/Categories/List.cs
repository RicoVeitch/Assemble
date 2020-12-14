using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using AutoMapper;
using System.Linq;

namespace Application.Categories
{
    public class List
    {
        private const int MAX_CATEGORIES = 7;
        public class Query : IRequest<CategoryDto> { }

        public class Handler : IRequestHandler<Query, CategoryDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<CategoryDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var categories = await _context.Categories.OrderByDescending(x => x.QuestionCategories.Count).Take(MAX_CATEGORIES).ToListAsync();

                return new CategoryDto
                {
                    Categories = categories.Select(x => x.Id).ToList()
                };
            }
        }
    }
}