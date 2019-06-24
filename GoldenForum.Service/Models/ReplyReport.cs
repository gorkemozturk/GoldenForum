using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class ReplyReport
    {
        public int Id { get; set; }
        public int ReplyId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }


        [ForeignKey("ReplyId")]
        public virtual Reply Reply { get; set; }
    }
}
