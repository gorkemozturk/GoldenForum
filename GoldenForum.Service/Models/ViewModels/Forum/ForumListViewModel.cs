using GoldenForum.Service.Models.ViewModels.Post;
using System.Collections.Generic;

namespace GoldenForum.Service.Models.ViewModels.Forum
{
    public class ForumListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public int PostsCount { get; set; }

        public PostSummaryViewModel LatestPost { get; set; }
    }
}
