using GoldenForum.Service.Models.ViewModels.Forum;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Home
{
    public class HomeViewModel
    {
        public IEnumerable<ForumListViewModel> Forums { get; set; }
        public IEnumerable<PostHomeViewModel> LatestPosts { get; set; }
        public IEnumerable<ReplyHomeViewModel> LatestReplies { get; set; }
    }
}
