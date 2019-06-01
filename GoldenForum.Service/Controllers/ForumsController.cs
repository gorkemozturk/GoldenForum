using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Forum;
using GoldenForum.Service.Models.ViewModels.Post;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ForumsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ForumListViewModel>>> GetForums()
        {
            return await _context.Forums.Select(f => new ForumListViewModel
            {
                Id = f.Id,
                Title = f.Title,
                Description = f.Description,
                ImageUrl = f.ImageUrl
            }).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ForumDetailViewModel>> GetForum(int id)
        {
            var forum = await _context.Forums.FindAsync(id);

            if (forum == null)
            {
                return NotFound();
            }

            return await ForumView(forum);
        }

        private async Task<ForumDetailViewModel> ForumView(Forum forum)
        {
            var forum_ = await _context.Forums.Include(f => f.Posts).Select(f => new ForumListViewModel
            {
                Id = f.Id,
                Title = f.Title,
                Description = f.Description,
                ImageUrl = f.ImageUrl

            }).FirstOrDefaultAsync(f => f.Id == forum.Id);

            var posts = await _context.Posts.Where(p => p.Forum == forum).Include(p => p.User).Include(p => p.Replies).Select(p => new PostListViewModel
            {
                Id = p.Id,
                Title = p.Title,
                AuthorId = p.User.Id,
                AuthorUserName = p.User.UserName,
                AuthorRating = p.User.Rating,
                RepliesCount = p.Replies.Count()
            }).ToListAsync();

            ForumDetailViewModel forumDetailViewModel = new ForumDetailViewModel()
            {
                Forum = forum_,
                Posts = posts
            };

            return forumDetailViewModel;
        }
    }
}
