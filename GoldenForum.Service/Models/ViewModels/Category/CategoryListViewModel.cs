using GoldenForum.Service.Models.ViewModels.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Category
{
    public class CategoryListViewModel
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }

        public IEnumerable<ForumListViewModel> Forums { get; set; }
    }
}
