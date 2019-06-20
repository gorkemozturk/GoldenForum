using System.Linq;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Category;
using GoldenForum.Service.Models.ViewModels.Forum;
using GoldenForum.Service.Models.ViewModels.Home;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using GoldenForum.Service.Models.ViewModels.User;
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
        public async Task<ActionResult<HomeDetailViewModel>> GetHomes()
        {
            var categories = await _context.Categories.Include(c => c.Forums).Select(c => new CategoryListViewModel
            {
                Id = c.Id,
                CategoryName = c.CategoryName,
                Forums = c.Forums.Select(f => new ForumListViewModel
                {
                    Id = f.Id,
                    Title = f.Title,
                    Slug = f.Slug,
                    Description = f.Description,
                    ImageUrl = f.ImageUrl,
                    PostsCount = f.Posts.Count(),
                    LatestPost = f.Posts.Select(p => new PostSummaryViewModel
                    {
                        Id = p.Id,
                        Slug = p.Slug,
                        Title = p.Title,
                        PostedAt = p.PostedAt,
                        Author = GetAuthor(p.User)
                    }).OrderByDescending(p => p.PostedAt).Take(1).FirstOrDefault()
                })
            }).ToListAsync();

            var latestPosts = await _context.Posts.Include(p => p.Forum).Select(p => new PostSummaryViewModel
            {
                Id = p.Id,
                Slug = p.Slug,
                Title = p.Title,
                PostedAt = p.PostedAt,
                Author = GetAuthor(p.User)
            }).OrderByDescending(p => p.PostedAt).Take(5).ToListAsync();

            var latestReplies = await _context.Replies.Include(r => r.Post).Select(r => new ReplySummaryViewModel
            {
                Id = r.Id,
                PostId = r.Post.Id,
                PostSlug = r.Post.Slug,
                Title = r.Post.Title,
                RepliedAt = r.RepliedAt,
                Author = GetAuthor(r.User)
            }).OrderByDescending(r => r.RepliedAt).Take(5).ToListAsync();

            var model = new HomeDetailViewModel()
            {
                Categories = categories,
                LatestPosts = latestPosts,
                LatestReplies = latestReplies
            };

            return model;
        }

        private UserSummaryViewModel GetAuthor(User user)
        {
            return new UserSummaryViewModel()
            {
                Id = user.UserName.ToLower(),
                UserName = user.UserName,
                ImageUrl = user.ImageUrl,
                Rating = user.Rating
            };
        }
    }
}