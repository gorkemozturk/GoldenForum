using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using GoldenForum.Service.Helpers;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        // GET: api/Posts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostDetailViewModel>> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.User).Include(r => r.Replies).ThenInclude(r => r.User).Select(p => new PostDetailViewModel
            {
                Id = p.Id,
                ForumId = p.ForumId,
                Title = p.Title,
                AuthorId = p.User.Id,
                AuthorUserName = p.User.UserName,
                AuthorImageUrl = p.User.ImageUrl,
                AuthorRating = p.User.Rating,
                AuthorRegisteredAt = p.User.RegisteredAt,
                AuthorPostsAndRepliesCount = p.User.Posts.Count() + p.User.Replies.Count(),
                Body = p.Body,
                PostedAt = p.PostedAt,
                Replies = p.Replies.Select(r => new ReplyListViewModel
                {
                    Id = r.Id,
                    AuthorId = r.User.Id,
                    AuthorUserName = r.User.UserName,
                    AuthorImageUrl = r.User.ImageUrl,
                    AuthorRating = r.User.Rating,
                    AuthorPostsAndRepliesCount = r.User.Posts.Count() + r.User.Replies.Count(),
                    AuthorRegisteredAt = r.User.RegisteredAt,
                    Body = r.Body,
                    RepliedAt = r.RepliedAt
                })
            }).FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        // PUT: api/Posts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            post.ModifiedAt = DateTime.Now;
            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
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

        // POST: api/Posts
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            var slugHelper = new SlugHelper();

            post.Slug = slugHelper.GenerateSlug(post.Title);
            post.PostedAt = DateTime.Now;

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPost", new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Post>> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return post;
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}
