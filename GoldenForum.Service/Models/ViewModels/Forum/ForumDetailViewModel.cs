using GoldenForum.Service.Models.ViewModels.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Forum
{
    public class ForumDetailViewModel
    {
        public ForumListViewModel Forum { get; set; }
        public IEnumerable<PostListViewModel> Posts { get; set; }
    }
}
