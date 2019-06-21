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
using Microsoft.AspNetCore.Identity;
using GoldenForum.Service.Models.ViewModels;
using GoldenForum.Service.Models.ViewModels.User;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public PostsController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
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
                Slug = p.Slug,
                Body = p.Body,
                Variety = p.Variety,
                PostedAt = p.PostedAt,
                ModifiedAt = p.ModifiedAt,
                IsDeleted = p.IsDeleted,
                Author = GetAuthor(p.User, p.User.Posts.Count() + p.User.Replies.Count()),
                Replies = p.Replies.Select(r => new ReplyListViewModel
                {
                    Id = r.Id,
                    Body = r.Body,
                    RepliedAt = r.RepliedAt,
                    ModifiedAt = r.ModifiedAt,
                    IsDeleted = r.IsDeleted,
                    Author = GetAuthor(r.User, r.User.Posts.Count() + r.User.Replies.Count())
                })
            }).FirstOrDefaultAsync(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

        private UserDetailViewModel GetAuthor(User user, int count)
        {
            return new UserDetailViewModel()
            {
                Id = user.Id,
                UserName = user.UserName,
                Rating = user.Rating,
                PostsAndRepliesCount = count,
                ImageUrl = user.ImageUrl,
                RegisteredAt = user.RegisteredAt
            };
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

        // PUT: api/Posts/5/Type
        [HttpPut("{id}/variety")]
        public async Task<IActionResult> PutPostVariety(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            var post_ = await _context.Posts.FindAsync(id);
            post_.Variety = post.Variety;

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

            post.IsDeleted = !post.IsDeleted;
            await _context.SaveChangesAsync();

            return post;
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}
