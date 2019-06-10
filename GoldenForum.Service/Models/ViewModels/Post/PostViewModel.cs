using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostViewModel
    {
        public PostDetailViewModel Post { get; set; }
        public IEnumerable<PostHomeViewModel> LatestPosts { get; set; }
    }
}
