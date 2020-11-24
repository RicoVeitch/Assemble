using Microsoft.EntityFrameworkCore;
using Domain;
using System;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }

    }
}