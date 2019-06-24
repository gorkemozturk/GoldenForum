using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // GET: api/ReplyReports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReplyReport>>> GetReplyReports()
        {
            return await _context.ReplyReports.ToListAsync();
        }

        // GET: api/ReplyReports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ReplyReport>> GetReplyReport(int id)
        {
            var replyReport = await _context.ReplyReports.FindAsync(id);

            if (replyReport == null)
            {
                return NotFound();
            }

            return replyReport;
        }

        // PUT: api/ReplyReports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReplyReport(int id, ReplyReport replyReport)
        {
            if (id != replyReport.Id)
            {
                return BadRequest();
            }

            _context.Entry(replyReport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReplyReportExists(id))
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

        // POST: api/ReplyReports
        [HttpPost]
        public async Task<ActionResult<ReplyReport>> PostReplyReport(ReplyReport replyReport)
        {
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

        private bool ReplyReportExists(int id)
        {
            return _context.ReplyReports.Any(e => e.Id == id);
        }
    }
}
