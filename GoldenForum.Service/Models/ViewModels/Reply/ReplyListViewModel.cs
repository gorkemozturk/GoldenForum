using GoldenForum.Service.Models.ViewModels.User;
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
        public DateTime? ModifiedAt { get; set; }
        public bool IsDeleted { get; set; }

        public UserDetailViewModel Author { get; set; }
    }
}
