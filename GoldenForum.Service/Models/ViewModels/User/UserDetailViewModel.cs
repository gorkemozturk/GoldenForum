﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.User
{
    public class UserDetailViewModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public int Rating { get; set; }
        public int PostsAndRepliesCount { get; set; }
        public string ImageUrl { get; set; }
        public DateTime RegisteredAt { get; set; }
    }
}
