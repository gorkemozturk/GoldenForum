using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.User
{
    public class UserSummaryViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string ImageUrl { get; set; }
        public int Rating { get; set; }
    }
}
