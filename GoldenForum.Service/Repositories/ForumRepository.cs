using System.Collections.Generic;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Interfaces;
using GoldenForum.Service.Models;
using Microsoft.EntityFrameworkCore;

namespace GoldenForum.Service.Repositories
{
    public class ForumRepository : BaseRepository<Forum>, IForumRepository
    {
        public ForumRepository(ApplicationDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Forum>> GetForumsWithPosts()
        {
            return await _context.Forums.Include(f => f.Posts).ToListAsync();
        }

        public Task UpdateDescription(int id, string description)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateTitle(int id, string title)
        {
            throw new System.NotImplementedException();
        }
    }
}
