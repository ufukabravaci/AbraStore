using API.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : IdentityDbContext<AppUser, AppRole, string>
{
    public DataContext(DbContextOptions<DataContext> options) : base(options)
    {
    }

    public DbSet<Product> Products => Set<Product>();
    public DbSet<Cart> Carts => Set<Cart>();
    public DbSet<CartItem> CartItems => Set<CartItem>();
    public DbSet<Order> Orders => Set<Order>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Product>().HasData(
            new List<Product>
            {
                new Product { Id = 1, Name = "IPhone 15",Description="Telefon açıklaması",ImageUrl="1.jpg" ,
                Price = 100,IsActive=true, Stock=100 },
                new Product { Id = 2, Name = "IPhone 16",Description="Telefon açıklaması",ImageUrl="2.jpg" ,
                Price = 200,IsActive=true, Stock=200 },
                new Product { Id = 3, Name = "IPhone 17",Description="Telefon açıklaması",ImageUrl="3.jpg" ,
                Price = 300,IsActive=true, Stock=300 },
                new Product { Id = 4, Name = "IPhone 18",Description="Telefon açıklaması",ImageUrl="4.jpg" ,
                Price = 400,IsActive=false, Stock=400 },
                new Product { Id = 5, Name = "IPhone 19",Description="Telefon açıklaması",ImageUrl="5.jpg" ,
                Price = 500,IsActive=true, Stock=500 },
                new Product { Id = 6, Name = "IPhone 20",Description="Telefon açıklaması",ImageUrl="6.jpg" ,
                Price = 600,IsActive=true, Stock=600 },
                
            }
        );
    }
}