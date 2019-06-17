using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class Reply
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int PostId { get; set; }
        public string Body { get; set; }
        public DateTime RepliedAt { get; set; }
        public DateTime? ModifiedAt { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
    }
}
