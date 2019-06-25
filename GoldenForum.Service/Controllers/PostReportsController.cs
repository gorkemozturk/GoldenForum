using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/PostReports
        [HttpPost]
        public async Task<ActionResult<PostReport>> PostPostReport(PostReport postReport)
        {
            postReport.ReportedAt = DateTime.Now;

            _context.PostReports.Add(postReport);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPostReport", new { id = postReport.Id }, postReport);
        }

        // DELETE: api/PostReports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PostReport>> DeletePostReport(int id)
        {
            var postReport = await _context.PostReports.FindAsync(id);
            if (postReport == null)
            {
                return NotFound();
            }

            _context.PostReports.Remove(postReport);
            await _context.SaveChangesAsync();

            return postReport;
        }
    }
}
