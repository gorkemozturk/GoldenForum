using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoldenForum.Service.Models.ViewModels.Report
{
    public class ReportListViewModel
    {
        public IEnumerable<PostReportListViewModel> PostReports { get; set; }
        public IEnumerable<ReplyReportListViewModel> ReplyReports { get; set; }
    }
}
