using GoldenForum.Service.Models.ViewModels.Post;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Report
{
    public class PostReportListViewModel
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public DateTime ReportedAt { get; set; }
        public PostSummaryViewModel Post { get; set; }
    }
}
