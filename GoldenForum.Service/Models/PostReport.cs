using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models
{
    public class PostReport
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }


        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
    }
}
