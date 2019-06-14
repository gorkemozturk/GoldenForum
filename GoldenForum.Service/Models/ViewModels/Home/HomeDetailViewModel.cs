using GoldenForum.Service.Models.ViewModels.Category;
using GoldenForum.Service.Models.ViewModels.Post;
using GoldenForum.Service.Models.ViewModels.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Home
{
    public class HomeDetailViewModel
    {
        public IEnumerable<CategoryListViewModel> Categories { get; set; }
        public IEnumerable<PostSummaryViewModel> LatestPosts { get; set; }
        public IEnumerable<ReplySummaryViewModel> LatestReplies { get; set; }
    }
}
