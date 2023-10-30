using Sitecore.ContentSearch.SearchTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Web;

namespace GWLG.Foundation.SitecoreExtensions.SearchModel
{
    public class CustomSearchResult:SearchResultItem
    {
        [Sitecore.ContentSearch.IndexField("contenttype")]
        public string ContentType { get; set; }

        [Sitecore.ContentSearch.IndexField("title_t")]
        public string SearchName { get; set; }
    }
}