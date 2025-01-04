using Microsoft.EntityFrameworkCore;
using PicassoOnline.Domain.Models.Entities;

namespace PicassoOnline.Persistence.InMemory;

public class LocalDbContext : DbContext
{
    DbSet<LocalDetailedData> LocalDetailedData { get; set; }
}