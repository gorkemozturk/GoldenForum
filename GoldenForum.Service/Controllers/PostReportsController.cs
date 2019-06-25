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
    public class PostReportsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PostReportsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/PostReports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostReport>>> GetPostReports()
        {
            return await _context.PostReports.ToListAsync();
        }

        // GET: api/PostReports/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PostReport>> GetPostReport(int id)
        {
            var postReport = await _context.PostReports.FindAsync(id);

            if (postReport == null)
            {
                return NotFound();
            }

            return postReport;
        }

        // PUT: api/PostReports/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPostReport(int id, PostReport postReport)
        {
            if (id != postReport.Id)
            {
                return BadRequest();
            }

            _context.Entry(postReport).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostReportExists(id))
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

        private bool PostReportExists(int id)
        {
            return _context.PostReports.Any(e => e.Id == id);
        }
    }
}
