using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Questions
{
    public class Details
    {
        public class Query : IRequest<Question>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Question>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Question> Handle(Query request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                return question;
            }
        }
    }
}