using GoldenForum.Service.Models.ViewModels.Forum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Post
{
    public class PostListViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string AuthorId { get; set; }
        public string AuthorUserName { get; set; }
        public double AuthorRating { get; set; }

        public int RepliesCount { get; set; }
    }
}
