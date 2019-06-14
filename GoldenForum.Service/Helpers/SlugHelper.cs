using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace GoldenForum.Service.Helpers
{
    public class SlugHelper
    {
        public string GenerateSlug(string input)
        {
            string str = RemoveDiacritics(input).ToLower();

            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            str = Regex.Replace(str, @"\s+", " ").Trim();
            str = Regex.Replace(str, @"\s", "-");

            return str;
        }
 
        private string RemoveDiacritics(string input)
        {
            var str = new string(input.Normalize(NormalizationForm.FormD)
                .Where(c => CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
                .ToArray());
 
            return str.Normalize(NormalizationForm.FormC);
        }
    }
}
