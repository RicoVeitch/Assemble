using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            // seed question if empty.
            if (!context.Questions.Any())
            {
                var questions = new List<Question>
                {
                    new Question
                    {
                        Title = "Title 1",
                        Description = "Desc 1",
                        Category = "Science",
                        Date = DateTime.Now
                    },
                    new Question
                    {
                        Title = "Title 2",
                        Description = "Desc 2",
                        Category = "English",
                        Date = DateTime.Now
                    },
                    new Question
                    {
                        Title = "Title 3",
                        Description = "Desc 3",
                        Category = "History",
                        Date = DateTime.Now
                    },
                };
                context.Questions.AddRange(questions);
                context.SaveChanges();
            }
        }
    }
}