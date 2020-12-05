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
        public DbSet<DislikedQuestion> DislikedQuestions { get; set; }
        public DbSet<LikedQuestion> LikedQuestions { get; set; }
        public DbSet<DislikedAnswer> DislikedAnswers { get; set; }
        public DbSet<LikedAnswer> LikedAnswers { get; set; }

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


            builder.Entity<LikedQuestion>(x => x.HasKey(lc =>
                new { lc.QuestionId, lc.UserId }));

            builder.Entity<LikedQuestion>()
                .HasOne(q => q.Question)
                .WithMany(a => a.LikedQuestions)
                .HasForeignKey(u => u.QuestionId);

            builder.Entity<LikedQuestion>()
                .HasOne(q => q.User)
                .WithMany(a => a.LikedQuestions)
                .HasForeignKey(u => u.UserId);


            builder.Entity<DislikedQuestion>(x => x.HasKey(lc =>
                new { lc.QuestionId, lc.UserId }));

            builder.Entity<DislikedQuestion>()
                .HasOne(q => q.Question)
                .WithMany(a => a.DislikedQuestions)
                .HasForeignKey(u => u.QuestionId);

            builder.Entity<DislikedQuestion>()
                .HasOne(q => q.User)
                .WithMany(a => a.DislikedQuestions)
                .HasForeignKey(u => u.UserId);


            builder.Entity<LikedAnswer>(x => x.HasKey(lc =>
                new { lc.AnswerId, lc.UserId }));

            builder.Entity<LikedAnswer>()
                .HasOne(q => q.Answer)
                .WithMany(a => a.LikedAnswers)
                .HasForeignKey(u => u.AnswerId);

            builder.Entity<LikedAnswer>()
                .HasOne(q => q.User)
                .WithMany(a => a.LikedAnswers)
                .HasForeignKey(u => u.UserId);


            builder.Entity<DislikedAnswer>(x => x.HasKey(lc =>
                new { lc.AnswerId, lc.UserId }));

            builder.Entity<DislikedAnswer>()
                .HasOne(q => q.Answer)
                .WithMany(a => a.DislikedAnswers)
                .HasForeignKey(u => u.AnswerId);

            builder.Entity<DislikedAnswer>()
                .HasOne(q => q.User)
                .WithMany(a => a.DislikedAnswers)
                .HasForeignKey(u => u.UserId);
        }

    }
}