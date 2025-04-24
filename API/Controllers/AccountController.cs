using API.Data;
using API.DTO;
using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;

    private readonly DataContext _context;
    public AccountController(UserManager<AppUser> userManager, TokenService tokenService, DataContext context)
    {
        _context = context;
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO model)
    {
        var user = await _userManager.FindByNameAsync(model.UserName);
        if (user == null) return BadRequest(new ProblemDetails { Title = "Invalid username" });

        var result = await _userManager.CheckPasswordAsync(user, model.Password);
        if (result)
        {
            var userCart = await GetOrCreate(model.UserName);
#pragma warning disable CS8604 // Possible null reference argument.
            var cookieCart = await GetOrCreate(Request.Cookies["customerId"]);
#pragma warning restore CS8604 // Possible null reference argument.
            if (userCart != null)
            {
                foreach (var item in userCart.CartItems)
                {
                    cookieCart.AddItem(item.Product, item.Quantity);
                }
                _context.Carts.Remove(userCart);
            }

            cookieCart.CustomerId = model.UserName;
            await _context.SaveChangesAsync();
            return Ok(new UserDTO
            {
                Name = user.Name!,
                Token = await _tokenService.GenerateToken(user)
            });
        }
        return Unauthorized();
    }

    private async Task<Cart> GetOrCreate(string custId)
    {
        var cart = await _context
            .Carts.Include(c => c.CartItems)
            .ThenInclude(ci => ci.Product)
            .Where(i => i.CustomerId == custId)
            .FirstOrDefaultAsync(c => c.CustomerId == Request.Cookies["customerId"]);
        if (cart == null)
        {
            var customerId = User.Identity?.Name;
            if (string.IsNullOrEmpty(customerId))
            {
                customerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions
                {
                    Expires = DateTime.Now.AddMonths(1),
                    IsEssential = true,
                };
                Response.Cookies.Append("customerId", customerId, cookieOptions);
            }
            cart = new Cart { CustomerId = customerId };
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();
        }
        return cart;
    }



    [HttpPost("register")]
    public async Task<IActionResult> CreateUser(RegisterDTO model)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var user = new AppUser
        {
            Name = model.Name,
            UserName = model.UserName,
            Email = model.Email,
        };
        var result = await _userManager.CreateAsync(user, model.Password);

        if (result.Succeeded)
        {
            await _userManager.AddToRoleAsync(user, "Customer");
            return StatusCode(201);
        }
        return BadRequest(result.Errors);
    }


    [HttpGet("getuser")]
    [Authorize]
    public async Task<ActionResult<UserDTO>> GetUser()
    {
        var user = await _userManager.FindByNameAsync(User.Identity?.Name!);
        if (user == null) return BadRequest(new ProblemDetails { Title = "User not found" });

        return new UserDTO
        {
            Name = user.Name!,
            Token = await _tokenService.GenerateToken(user)
        };
    }

}