using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }
            if (!context.Questions.Any())
            {
                var categories = new List<Category>
                {
                    new Category
                    {
                        Id = "Biology",
                        // QuestionCategories = new List<QuestionCategory>()
                    },
                };
                context.Categories.AddRange(categories);
                var questions = new List<Question>
                {
                    new Question
                    {
                        Id = "A",
                        Title = "test",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        QuestionCategories = new List<QuestionCategory>
                        {
                            new QuestionCategory
                            {
                                CategoryId = "Biology",
                                QuestionId = "A",
                            }
                        }
                    }
                };
                context.Questions.AddRange(questions);
                context.SaveChanges();
            }

            // if (!context.Categories.Any())
            // {
            //     var categories = new List<Category>
            //     {
            //         new Category
            //         {
            //             Id = "Biology",
            //             // QuestionCategories = new List<QuestionCategory>()
            //         },
            //         // new Category
            //         // {
            //         //     Id = "Theology",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //         // new Category
            //         // {
            //         //     Id = "Computer Science",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //         // new Category
            //         // {
            //         //     Id = "Hardware",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //         // new Category
            //         // {
            //         //     Id = "English",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //         // new Category
            //         // {
            //         //     Id = "History",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //         // new Category
            //         // {
            //         //     Id = "Science",
            //         //     QuestionCategories = new List<QuestionCategory>()
            //         // },
            //     };
            //     context.Categories.AddRange(categories);
            //     context.SaveChanges();
            // }
        }
    }
}