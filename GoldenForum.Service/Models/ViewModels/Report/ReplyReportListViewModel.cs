using GoldenForum.Service.Models.ViewModels.Reply;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Report
{
    public class ReplyReportListViewModel
    {
        public int Id { get; set; }
        public string Sender { get; set; }
        public DateTime ReportedAt { get; set; }
        public ReplySummaryViewModel Reply { get; set; }
    }
}
