using GoldenForum.Service.Models.ViewModels.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostDetailViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string AuthorId { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorImageUrl { get; set; }
        public int AuthorRating { get; set; }
        public int AuthorPostsCount { get; set; }
        public DateTime AuthorRegisteredAt { get; set; }

        public string Body { get; set; }
        public DateTime PostedAt { get; set; }

        public IEnumerable<ReplyListViewModel> Replies { get; set; }
    }
}
