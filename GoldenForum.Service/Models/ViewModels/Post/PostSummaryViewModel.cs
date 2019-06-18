using GoldenForum.Service.Models.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostSummaryViewModel
    {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public DateTime PostedAt { get; set; }

        public UserSummaryViewModel Author { get; set; }
    }
}
