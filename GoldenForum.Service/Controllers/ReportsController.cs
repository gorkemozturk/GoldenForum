using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Report;
using GoldenForum.Service.Models.ViewModels.Post;
using System;
using GoldenForum.Service.Models.ViewModels.User;
using GoldenForum.Service.Models.ViewModels.Reply;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        public async Task<ActionResult<ReportListViewModel>> GetReports()
        {
            var postReports = await _context.PostReports.Include(r => r.Post).Include(r => r.User).Include(r => r.Post).ThenInclude(u => u.User).Select(r => new PostReportListViewModel
            {
                Id = r.Id,
                Sender = r.User.UserName,
                ReportedAt = r.ReportedAt,
                Post = GetPostWithAuthor(r.Post, r.Post.User)
            }).ToListAsync();

            var replyReports = await _context.ReplyReports.Include(r => r.Reply).Include(r => r.User).Include(r => r.Reply).ThenInclude(u => u.User).Select(r => new ReplyReportListViewModel
            {
                Id = r.Id,
                Sender = r.User.UserName,
                ReportedAt = r.ReportedAt,
                Reply = GetReplyWithAuthorAndPost(r.Reply, r.Reply.User, r.Reply.Post)
            }).ToListAsync();

            return new ReportListViewModel()
            {
                PostReports = postReports,
                ReplyReports = replyReports
            };
        }

        private PostSummaryViewModel GetPostWithAuthor(Post post, User user)
        {
            return new PostSummaryViewModel() 
            {
                Id = post.Id,
                Slug = post.Slug,
                Title = post.Title,
                PostedAt = post.PostedAt,
                Author = GetAuthor(user)
            };
        }

        private ReplySummaryViewModel GetReplyWithAuthorAndPost(Reply reply, User user, Post post)
        {
            return new ReplySummaryViewModel()
            {
                Id = reply.Id,
                PostId = post.Id,
                PostSlug = post.Slug,
                Title = post.Title,
                RepliedAt = reply.RepliedAt,
                Author = GetAuthor(user)
            };
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

        private PostSummaryViewModel PostSummaryViewModel()
        {
            throw new NotImplementedException();
        }

        // GET: api/Reports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

        // PUT: api/Reports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReport(int id, Report report)
        {
            if (id != report.Id)
            {
                return BadRequest();
            }

            _context.Entry(report).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReportExists(id))
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

        // POST: api/Reports
        [HttpPost]
        public async Task<ActionResult<Report>> PostReport(Report report)
        {
            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReport", new { id = report.Id }, report);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Report>> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return report;
        }

        private bool ReportExists(int id)
        {
            return _context.Reports.Any(e => e.Id == id);
        }
    }
}
