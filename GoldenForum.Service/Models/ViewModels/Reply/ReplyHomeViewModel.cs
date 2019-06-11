using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Reply
{
    public class ReplyHomeViewModel
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Title { get; set; }
        public DateTime RepliedAt { get; set; }

        public string AuthorId { get; set; }
        public string AuthorUserName { get; set; }
        public string AuthorImageUrl { get; set; }
    }
}
