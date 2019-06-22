using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GoldenForum.Service.Data;
using GoldenForum.Service.Models;
using GoldenForum.Service.Models.ViewModels.Acclaim;

namespace GoldenForum.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcclaimsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AcclaimsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Acclaims
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Acclaim>>> GetAcclaims()
        {
            return await _context.Acclaims.ToListAsync();
        }

        // GET: api/Acclaims/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Acclaim>> GetAcclaim(int id)
        {
            var acclaim = await _context.Acclaims.FindAsync(id);

            if (acclaim == null)
            {
                return NotFound();
            }

            return acclaim;
        }

        // PUT: api/Acclaims/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcclaim(int id, Acclaim acclaim)
        {
            if (id != acclaim.Id)
            {
                return BadRequest();
            }

            _context.Entry(acclaim).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcclaimExists(id))
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

        // POST: api/Acclaims
        [HttpPost]
        public async Task<ActionResult<Acclaim>> PostAcclaim(AcclaimCreateViewModel model)
        {
            var acclaim = new Acclaim()
            {
                UserId = model.UserId,
                PostId = model.PostId
            };

            var author = await _context.ApplicationUsers.FindAsync(model.AuthorId);
            author.Rating += 1;

            _context.Acclaims.Add(acclaim);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcclaim", new { id = acclaim.Id }, acclaim);
        }

        // DELETE: api/Acclaims/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Acclaim>> DeleteAcclaim(int id)
        {
            var acclaim = await _context.Acclaims.FindAsync(id);
            if (acclaim == null)
            {
                return NotFound();
            }

            _context.Acclaims.Remove(acclaim);
            await _context.SaveChangesAsync();

            return acclaim;
        }

        private bool AcclaimExists(int id)
        {
            return _context.Acclaims.Any(e => e.Id == id);
        }
    }
}
