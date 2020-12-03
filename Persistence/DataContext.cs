using Microsoft.EntityFrameworkCore;
using Domain;
using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<User> // adds entity for User automatically
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<QuestionCategory> QuestionCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder); // gives pk to User

            builder.Entity<QuestionCategory>(x => x.HasKey(qc =>
                new { qc.QuestionId, qc.CategoryId }));

            builder.Entity<QuestionCategory>()
                .HasOne(q => q.Question)
                .WithMany(a => a.QuestionCategories)
                .HasForeignKey(u => u.QuestionId);

            builder.Entity<QuestionCategory>()
                .HasOne(q => q.Category)
                .WithMany(a => a.QuestionCategories)
                .HasForeignKey(u => u.CategoryId);
        }

    }
}