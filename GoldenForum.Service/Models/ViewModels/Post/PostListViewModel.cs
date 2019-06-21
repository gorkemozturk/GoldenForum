using GoldenForum.Service.Models.ViewModels.User;
using System;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public int Variety { get; set; }
        public int RepliesCount { get; set; }
        public DateTime PostedAt { get; set; }

        public UserSummaryViewModel Author { get; set; }
    }
}
