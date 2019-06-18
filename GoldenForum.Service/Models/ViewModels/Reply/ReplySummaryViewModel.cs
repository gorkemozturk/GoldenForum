using GoldenForum.Service.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Reply
{
    public class ReplySummaryViewModel
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string PostSlug { get; set; }
        public string Title { get; set; }
        public DateTime RepliedAt { get; set; }

        public UserSummaryViewModel Author { get; set; }
    }
}
