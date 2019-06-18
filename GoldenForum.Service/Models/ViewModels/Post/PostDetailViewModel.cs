using GoldenForum.Service.Models.ViewModels.Reply;
using GoldenForum.Service.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostDetailViewModel
    {
        public int Id { get; set; }
        public int ForumId { get; set; }
        public string Title { get; set; }
        public string Slug { get; set; }
        public string Body { get; set; }
        public DateTime PostedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public UserDetailViewModel Author { get; set; }
        public IEnumerable<ReplyListViewModel> Replies { get; set; }
    }
}
