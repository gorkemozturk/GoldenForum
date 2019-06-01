using GoldenForum.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Interfaces
{
    public interface IForumRepository : IBaseRepository<Forum>
    {
        Task<IEnumerable<Forum>> GetForumsWithPosts();
        Task UpdateTitle(int id, string title);
        Task UpdateDescription(int id, string description);
    }
}
