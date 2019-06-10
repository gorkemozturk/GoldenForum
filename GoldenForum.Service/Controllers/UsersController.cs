using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.User;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserDetailViewModel>> GetUser(string id)
        {
            return await _context.ApplicationUsers.Include(u => u.Posts).Include(u => u.Replies).Select(u => new UserDetailViewModel
            {
                Id = u.Id,
                UserName = u.UserName,
                Rating = u.Rating,
                PostsCount = u.Posts.Count() + u.Replies.Count(),
                ImageUrl = u.ImageUrl,
                RegisteredAt = u.RegisteredAt,
                UserPosts = u.Posts.Select(p => new PostHomeViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    PostedAt = p.PostedAt,
                    AuthorId = p.User.Id,
                    AuthorUserName = p.User.UserName,
                    AuthorImageUrl = p.User.ImageUrl
                })
            }).FirstOrDefaultAsync(u => u.Id == id);
        }
    }
}