using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Reply
{
    public class ReplyListViewModel
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime RepliedAt { get; set; }

        public string AuthorId { get; set; }
        public string AuthorUserName { get; set; }
        public int AuthorRating { get; set; }
        public int AuthorPostsAndRepliesCount { get; set; }
        public string AuthorImageUrl { get; set; }
        public DateTime AuthorRegisteredAt { get; set; }
    }
}
