using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class Reply
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime RepliedAt { get; set; }

        public virtual User User { get; set; }
        public virtual Post Post { get; set; }
    }
}
