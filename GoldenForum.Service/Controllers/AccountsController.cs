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
        private readonly ApplicationDbContext context;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly UserManager<IdentityUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly Configuration configuration;

        public AccountsController(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            RoleManager<IdentityRole> roleManager,
            ApplicationDbContext context,
            Configuration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.context = context;
            this.configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginViewModel login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(login);
            }

            var result = await signInManager.PasswordSignInAsync(login.Email, login.Password, false, false);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            try
            {
                var user = await context.ApplicationUsers.FirstOrDefaultAsync(u => u.Email == login.Email);
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

            var user = new User { UserName = registration.Email, Email = registration.Email };
            var result = await userManager.CreateAsync(user, registration.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            try
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
                await userManager.AddToRoleAsync(user, "User");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return NoContent();
        }

        private async Task<string> TokenHandler(User user)
        {
            var roles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
            };

            foreach (var role in roles)
            {
                claims.Add(new Claim(JwtRegisteredClaimNames.Typ, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.Key));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(signingCredentials: signingCredentials, issuer: configuration.Copyright, claims: claims, expires: DateTime.UtcNow.AddDays(1));

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}