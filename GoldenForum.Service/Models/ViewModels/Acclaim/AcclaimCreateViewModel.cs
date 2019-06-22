using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Acclaim
{
    public class AcclaimCreateViewModel
    {
        public string UserId { get; set; }
        public string AuthorId { get; set; }
        public int PostId { get; set; }
    }
}
