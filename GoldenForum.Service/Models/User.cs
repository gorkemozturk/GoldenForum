using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class User : IdentityUser
    {
        public int Rating { get; set; }
        public string ImageUrl { get; set; }
        public DateTime RegisteredAt { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
        public virtual ICollection<Acclaim> Acclaims { get; set; }

    }
}
