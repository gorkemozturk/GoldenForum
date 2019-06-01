using System.Collections.Generic;
using System.Threading.Tasks;
using GoldenForum.Service.Data;
using GoldenForum.Service.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GoldenForum.Service.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;

        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task CreateResource(T entry)
        {
            _context.Add(entry);
            await _context.SaveChangesAsync();
        }

        public async Task<T> FindResource(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetResources()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task RemoveResource(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            _context.Remove(entity);

            await _context.SaveChangesAsync();
        }

        public async Task UpdateResource(T entry)
        {
            _context.Entry(entry).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
