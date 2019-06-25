using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReplyReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReplyReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/ReplyReports
        [HttpPost]
        public async Task<ActionResult<ReplyReport>> PostReplyReport(ReplyReport replyReport)
        {
            replyReport.ReportedAt = DateTime.Now;

            _context.ReplyReports.Add(replyReport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReplyReport", new { id = replyReport.Id }, replyReport);
        }

        // DELETE: api/ReplyReports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ReplyReport>> DeleteReplyReport(int id)
        {
            var replyReport = await _context.ReplyReports.FindAsync(id);
            if (replyReport == null)
            {
                return NotFound();
            }

            _context.ReplyReports.Remove(replyReport);
            await _context.SaveChangesAsync();

            return replyReport;
        }
    }
}
