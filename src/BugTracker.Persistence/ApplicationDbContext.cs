using BugTracker.Domain.Tickets;
using Microsoft.EntityFrameworkCore;

namespace BugTracker.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Ticket> Tickets { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}