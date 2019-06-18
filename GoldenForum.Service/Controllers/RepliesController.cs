using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Reply;
using GoldenForum.Service.Models.ViewModels.User;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RepliesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public RepliesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Replies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reply>>> GetReplies()
        {
            return await _context.Replies.ToListAsync();
        }

        // GET: api/Replies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReplyDetailViewModel>> GetReply(int id)
        {
            var reply = await _context.Replies.Select(r => new ReplyDetailViewModel
            {
                Id = r.Id,
                Body = r.Body,
                RepliedAt = r.RepliedAt,
                Author = GetAuthor(r.User, r.User.Posts.Count() + r.User.Replies.Count())
            }).FirstOrDefaultAsync(p => p.Id == id);

            if (reply == null)
            {
                return NotFound();
            }

            return reply;
        }

        // PUT: api/Replies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReply(int id, Reply reply)
        {
            if (id != reply.Id)
            {
                return BadRequest();
            }

            reply.ModifiedAt = DateTime.Now;
            _context.Entry(reply).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReplyExists(id))
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

        // POST: api/Replies
        [HttpPost]
        public async Task<ActionResult<Reply>> PostReply(Reply reply)
        {
            reply.RepliedAt = DateTime.Now;

            _context.Replies.Add(reply);
            await _context.SaveChangesAsync();

            var createdReply = await _context.Replies.Select(r => new ReplyDetailViewModel
            {
                Id = r.Id,
                Body = r.Body,
                RepliedAt = r.RepliedAt,
                Author = GetAuthor(r.User, r.User.Posts.Count() + r.User.Replies.Count())
            }).FirstOrDefaultAsync(p => p.Id == reply.Id);

            return CreatedAtAction("GetReply", new ReplyDetailViewModel { Id = createdReply.Id }, createdReply);
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

        // DELETE: api/Replies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reply>> DeleteReply(int id)
        {
            var reply = await _context.Replies.FindAsync(id);
            if (reply == null)
            {
                return NotFound();
            }

            reply.IsDeleted = !reply.IsDeleted;
            await _context.SaveChangesAsync();

            return reply;
        }

        private bool ReplyExists(int id)
        {
            return _context.Replies.Any(e => e.Id == id);
        }
    }
}
