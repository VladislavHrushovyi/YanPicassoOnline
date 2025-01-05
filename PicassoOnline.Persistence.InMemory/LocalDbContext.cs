using Microsoft.EntityFrameworkCore;
using PicassoOnline.Domain.Models.Entities;

namespace PicassoOnline.Persistence.InMemory;

public class LocalDbContext(DbContextOptions<LocalDbContext> options) : DbContext(options)
{
    public DbSet<LocalDetailedData> LocalDetailedData { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LocalDetailedData>(x => x.HasData(
            new LocalDetailedData { Id = 1, Base64Image = "TEST1" },
            new LocalDetailedData { Id = 2, Base64Image = "" },
            new LocalDetailedData { Id = 1, Base64Image = "" }
        ));
    }
}