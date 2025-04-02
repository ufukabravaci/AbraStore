using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTO;
using API.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CartController : ControllerBase
    {
        private readonly DataContext _context;

        public CartController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CartDTO>> GetCart()
        {
            return CartToDTO(await GetOrCreate());
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            var product = await _context.Products.FirstOrDefaultAsync(i => i.Id == productId);
            if (product == null)
                return NotFound("Product not found");
            cart.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return CreatedAtAction(nameof(GetCart), CartToDTO(cart));
            return BadRequest(new ProblemDetails { Title = "Problem adding item to cart" });
        }

        [HttpDelete] 
        public async Task<ActionResult> DeleteItemFromCart(int productId, int quantity)
        {
            var cart = await GetOrCreate();
            cart.DeleteItem(productId, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
                return Ok(CartToDTO(cart));
            return BadRequest(new ProblemDetails { Title = "Problem deleting item from cart" });
        }
                               

        private async Task<Cart> GetOrCreate()
        {
            var cart = await _context
                .Carts.Include(c => c.CartItems)
                .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);
            if (cart == null)
            {
                var customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true,
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
                cart = new Cart { CustomerId = customerId };
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();
            }
            return cart;
        }

        private CartDTO CartToDTO(Cart cart)
        {
            return new CartDTO
            {
                CartId = cart.CartId,
                CustomerId = cart.CustomerId,
                CartItems = cart.CartItems.Select(i => new CartItemDTO
                {
                    ProductId = i.ProductId,
                    Name = i.Product.Name,
                    Price = i.Product.Price,
                    ImageUrl = i.Product.ImageUrl,
                    Quantity = i.Quantity
                }).ToList()
            };
        }
    }
}
