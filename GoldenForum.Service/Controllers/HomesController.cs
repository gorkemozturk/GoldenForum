using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models.ViewModels.Forum;
using GoldenForum.Service.Models.ViewModels.Home;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Homes
        [HttpGet]
        public async Task<ActionResult<HomeViewModel>> GetHomes()
        {
            var forums = await _context.Forums.Include(f => f.Posts).Select(f => new ForumListViewModel
            {
                Id = f.Id,
                Title = f.Title,
                Description = f.Description,
                ImageUrl = f.ImageUrl,
                PostsCount = f.Posts.Count(),
                LatestPosts = f.Posts.Select(p => new PostHomeViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    PostedAt = p.PostedAt,
                    AuthorId = p.User.Id,
                    AuthorUserName = p.User.UserName,
                    AuthorImageUrl = p.User.ImageUrl
                }).TakeLast(1)
            }).ToListAsync();

            var latestPosts = await _context.Posts.Include(p => p.Forum).Select(p => new PostHomeViewModel
            {
                Id = p.Id,
                Title = p.Title,
                PostedAt = p.PostedAt,
                AuthorId = p.User.Id,
                AuthorUserName = p.User.UserName,
                AuthorImageUrl = p.User.ImageUrl
            }).Take(5).OrderByDescending(p => p.Id).ToListAsync();

            var latestReplies = await _context.Replies.Include(p => p.Post).Select(p => new ReplyHomeViewModel
            {
                Id = p.Id,
                PostId = p.Post.Id,
                Title = p.Post.Title,
                RepliedAt = p.RepliedAt,
                AuthorId = p.User.Id,
                AuthorUserName = p.User.UserName,
                AuthorImageUrl = p.User.ImageUrl
            }).Take(5).OrderByDescending(p => p.Id).ToListAsync();

            var model = new HomeViewModel()
            {
                Forums = forums,
                LatestPosts = latestPosts,
                LatestReplies = latestReplies
            };

            return model;
        }
    }
}