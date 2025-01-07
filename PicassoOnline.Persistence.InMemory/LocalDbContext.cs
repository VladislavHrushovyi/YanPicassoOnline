using Microsoft.EntityFrameworkCore;
using PicassoOnline.Domain.Models.Entities;

namespace PicassoOnline.Persistence.InMemory;

public class LocalDbContext(DbContextOptions<LocalDbContext> options) : DbContext(options)
{
    public DbSet<LocalDetailedData> LocalDetailedData { get; set; }

}