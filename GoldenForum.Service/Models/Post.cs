using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class Post
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ForumId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public DateTime PostedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("ForumId")]
        public virtual Forum Forum { get; set; }
        public virtual ICollection<Reply> Replies { get; set; }
    }
}
