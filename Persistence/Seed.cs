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
                    new User {
                        Id = "b",
                        DisplayName = "Jack",
                        UserName = "jack",
                        Email = "jack@test.com"
                    }
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
                    },
                    new Category
                    {
                        Id = "Theology"
                    },
                    new Category
                    {
                        Id = "Computer-Science"
                    },
                    new Category
                    {
                        Id = "Hardware"
                    },
                    new Category
                    {
                        Id = "English"
                    },
                    new Category
                    {
                        Id = "History"
                    },
                    new Category
                    {
                        Id = "Economics"
                    },
                };
                await context.Categories.AddRangeAsync(categories);
                var questions = new List<Question>
                {
                    new Question
                    {
                        Id = "A",
                        Title = "Lorem ipsum",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "dolor sit amet, consectetur adipiscing elit. Nunc auctor leo nec convallis vestibulum. Suspendisse ac lorem lectus. Nunc nec sodales odio. Sed sed rhoncus ipsum, ut aliquam sapien. Curabitur ac libero velit. Phasellus eu consectetur neque. Mauris tempor euismod enim nec sagittis. Aliquam convallis ultricies ex ac gravida. Ut aliquet euismod maximus. Donec luctus dictum suscipit. Nunc a erat a turpis blandit pharetra eget in purus. Vivamus porta et odio ut lobortis. Nulla tempor gravida lorem ut fringilla.",
                        Author = await userManager.FindByIdAsync("a"),
                        QuestionCategories = new List<QuestionCategory>
                        {
                            new QuestionCategory
                            {
                                CategoryId = "Biology",
                                QuestionId = "A",
                            }
                        }
                    },
                    new Question
                    {
                        Id = "B",
                        Title = "Mauris semper",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Pellentesque congue, odio vel dictum maximus, massa leo fermentum nisl, quis sollicitudin neque tellus eu augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec leo velit, semper viverra dictum nec, ornare in magna. In hac habitasse platea dictumst. Cras congue nisl sit amet quam pharetra, ut vestibulum odio pharetra. Praesent eleifend eros ullamcorper libero faucibus, sagittis varius tellus iaculis.",
                        Author = await userManager.FindByIdAsync("a"),
                        QuestionCategories = new List<QuestionCategory>
                        {
                            new QuestionCategory
                            {
                                CategoryId = "History",
                                QuestionId = "B",
                            },
                            new QuestionCategory
                            {
                                CategoryId = "Computer-Science",
                                QuestionId = "B",
                            }
                        }
                    },
                    new Question
                    {
                        Id = "C",
                        Title = "Vestibulum porta",
                        Date = DateTime.Now.AddMonths(-3),
                        Description = "Aliquam placerat, diam a accumsan placerat, ante arcu convallis sapien, quis cursus mauris urna non nunc. In quis ullamcorper nisl. Proin quam urna, faucibus eu mattis non, dignissim in nunc. Aliquam consectetur purus at nisi lobortis, eu tincidunt nibh maximus. Donec orci ipsum, viverra id eros in, mattis egestas nibh. Proin gravida nisl eu ipsum tristique semper.",
                        Author = await userManager.FindByIdAsync("b"),
                        QuestionCategories = new List<QuestionCategory>
                        {
                            new QuestionCategory
                            {
                                CategoryId = "English",
                                QuestionId = "C",
                            },
                            new QuestionCategory
                            {
                                CategoryId = "Theology",
                                QuestionId = "C",
                            }
                        }
                    }
                };
                await context.Questions.AddRangeAsync(questions);
                await context.SaveChangesAsync();
            }
        }
    }
}