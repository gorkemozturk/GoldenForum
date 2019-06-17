using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Account;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly Configuration _configuration;

        public AccountsController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            Configuration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginViewModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(login);
            }

            var result = await _signInManager.PasswordSignInAsync(login.UserName, login.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            try
            {
                var user = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.UserName == login.UserName);
                return await TokenHandler(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterViewModel registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(registration);
            }

            var user = new User { UserName = registration.UserName, Email = registration.Email, ImageUrl = "/assets/images/user/avatar/avatar.png", RegisteredAt = DateTime.Now };
            var result = await _userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            try
            {
                if (await _roleManager.RoleExistsAsync("User") == false) { await _roleManager.CreateAsync(new IdentityRole("User")); }
                await _userManager.AddToRoleAsync(user, "User");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

        private async Task<string> TokenHandler(User user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim("image_url", user.ImageUrl),
                new Claim("rating", user.Rating.ToString()),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Typ, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.Key));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(signingCredentials: signingCredentials, issuer: _configuration.Copyright, claims: claims, expires: DateTime.UtcNow.AddDays(1));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}