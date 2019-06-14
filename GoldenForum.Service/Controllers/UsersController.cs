using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
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
            var user = await _context.ApplicationUsers.Include(u => u.Posts).Include(u => u.Replies).Select(u => new UserDetailViewModel
            {
                Id = u.Id,
                UserName = u.UserName,
                Rating = u.Rating,
                PostsCount = u.Posts.Count() + u.Replies.Count(),
                ImageUrl = u.ImageUrl,
                RegisteredAt = u.RegisteredAt,
                Posts = u.Posts.Select(p => new PostSummaryViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    PostedAt = p.PostedAt,
                    AuthorId = p.User.Id,
                    AuthorUserName = p.User.UserName,
                    AuthorImageUrl = p.User.ImageUrl
                }),
                Replies = u.Replies.Select(p => new ReplySummaryViewModel
                {
                    Id = p.Id,
                    PostId = p.Post.Id,
                    Title = p.Post.Title,
                    RepliedAt = p.RepliedAt,
                    AuthorId = p.User.Id,
                    AuthorUserName = p.User.UserName,
                    AuthorImageUrl = p.User.ImageUrl
                })
            }).FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}