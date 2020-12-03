using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;
using Application.Errors;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Application.Questions
{
    public class Edit
    {
        public class Command : IRequest
        {
            public string Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public ICollection<string> categories { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var question = await _context.Questions.FindAsync(request.Id);

                if (question == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { question = "question not found" });
                }

                question.Title = request.Title ?? question.Title;
                question.Description = request.Description ?? question.Description;
                question.Date = request.Date ?? question.Date;

                if (request.categories?.Count > 0)
                {
                    question.QuestionCategories.Clear();
                    foreach (var newCategory in request.categories)
                    {
                        var category = await _context.Categories.SingleOrDefaultAsync(x => x.Id == newCategory);
                        var questionCategory = new QuestionCategory
                        {
                            Question = question,
                            Category = category
                        };
                        question.QuestionCategories.Add(questionCategory);
                    }
                }

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Error in saving changes");
            }
        }
    }
}