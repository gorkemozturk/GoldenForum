using System.Collections.Generic;
using System.Threading.Tasks;

namespace GoldenForum.Service.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetResources();
        Task<T> FindResource(int id);
        Task CreateResource(T entry);
        Task UpdateResource(T entry);
        Task RemoveResource(int id);
    }
}
