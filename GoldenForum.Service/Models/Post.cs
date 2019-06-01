using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime PostedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Forum Forum { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
    }
}
