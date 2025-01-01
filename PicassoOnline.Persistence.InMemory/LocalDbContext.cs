using Microsoft.EntityFrameworkCore;
using PicassoOnline.Persistence.InMemory.Entities;

namespace PicassoOnline.Persistence.InMemory;

public class LocalDbContext : DbContext
{
    DbSet<DrawBoardState> DrawBoardStates { get; set; }
}