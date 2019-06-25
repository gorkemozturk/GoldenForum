using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class ReplyReport : Report
    {
        public int? ReplyId { get; set; }

        [ForeignKey("ReplyId")]
        public virtual Reply Reply { get; set; }
    }
}
