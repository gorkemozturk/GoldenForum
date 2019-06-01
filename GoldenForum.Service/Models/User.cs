using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class User : IdentityUser
    {
        public double Rating { get; set; }
        public string ImageUrl { get; set; }
        public DateTime RegisteredAt { get; set; }
    }
}
