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
using GoldenForum.Service.Helpers;
using GoldenForum.Service.Models.ViewModels.User;

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

        // GET: api/Forums
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Forum>>> GetForums()
        {
            return await _context.Forums.ToListAsync();
        }

        // GET: api/Forums/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ForumDetailViewModel>> GetForum(int id)
        {
            var forum = await _context.Forums.Include(f => f.Posts).Select(f => new ForumDetailViewModel
            {
                Id = f.Id,
                Title = f.Title,
                Slug = f.Slug,
                Description = f.Description,
                ImageUrl = f.ImageUrl,
                Posts = f.Posts.Select(p => new PostListViewModel
                {
                    Id = p.Id,
                    Title = p.Title,
                    Slug = p.Slug,
                    PostedAt = p.PostedAt,
                    Type = p.PostType.ToString(),
                    RepliesCount = p.Replies.Count(),
                    Author = GetAuthor(p.User)
                })
            }).FirstOrDefaultAsync(f => f.Id == id);

            if (forum == null)
            {
                return NotFound();
            }

            return forum;
        }

        private UserSummaryViewModel GetAuthor(User user)
        {
            return new UserSummaryViewModel()
            {
                Id = user.Id,
                UserName = user.UserName,
                ImageUrl = user.ImageUrl,
                Rating = user.Rating
            };
        }

        // PUT: api/Forums/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutForum(int id, Forum forum)
        {
            if (id != forum.Id)
            {
                return BadRequest();
            }

            _context.Entry(forum).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForumExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Forums
        [HttpPost]
        public async Task<ActionResult<Forum>> PostForum(Forum forum)
        {
            var slugHelper = new SlugHelper();

            forum.Slug = slugHelper.GenerateSlug(forum.Title);

            _context.Forums.Add(forum);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetForum", new { id = forum.Id }, forum);
        }

        // DELETE: api/Forums/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Forum>> DeleteForum(int id)
        {
            var forum = await _context.Forums.FindAsync(id);
            if (forum == null)
            {
                return NotFound();
            }

            _context.Forums.Remove(forum);
            await _context.SaveChangesAsync();

            return forum;
        }

        private bool ForumExists(int id)
        {
            return _context.Forums.Any(e => e.Id == id);
        }
    }
}
