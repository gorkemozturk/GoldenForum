using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.User
{
    public class UserProfileViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int Rating { get; set; }
        public int PostsAndRepliesCount { get; set; }
        public string ImageUrl { get; set; }
        public DateTime RegisteredAt { get; set; }

        public IEnumerable<PostSummaryViewModel> Posts { get; set; }
        public IEnumerable<PostSummaryViewModel> AcclaimedPosts { get; set; }
        public IEnumerable<ReplySummaryViewModel> Replies { get; set; }
    }
}
