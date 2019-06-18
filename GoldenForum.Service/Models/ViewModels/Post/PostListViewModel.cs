using System;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public DateTime PostedAt { get; set; }
        public int RepliesCount { get; set; }
        public bool IsAttached { get; set; }

        public string AuthorId { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorImageUrl { get; set; }
        public int AuthorRating { get; set; }
    }
}
