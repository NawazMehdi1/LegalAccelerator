using GWLG.Foundation.SitecoreExtensions.SearchModel;
using Sitecore;
using Sitecore.ContentSearch.Linq;
using Sitecore.ContentSearch.Utilities;
using Sitecore.Diagnostics;
using Sitecore.LayoutService.Mvc.ItemResolving;
using Sitecore.LayoutService.Mvc.Pipelines.HttpRequestBegin;
using Sitecore.LayoutService.Mvc.Pipelines.RequestBegin;
using Sitecore.LayoutService.Mvc.Routing;
using Sitecore.Mvc.Pipelines.Request.RequestBegin;
using Sitecore.Pipelines.HttpRequest;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace GWLG.Foundation.SitecoreExtensions.PipelineProcessors.CustomItemResolver
{
    public class PeopleBucketItemResolver : RequestBeginProcessor
    {
        public IItemResolver itemResolver1 { get; set; }
        public IRouteMapper routeMapper1 { get; set; }

        public PeopleBucketItemResolver(IItemResolver itemResolver, IRouteMapper routeMapper)
        {
            Assert.ArgumentNotNull(itemResolver, "itemResolver");
            Assert.ArgumentNotNull(routeMapper, "routeMapper");
            itemResolver1 = itemResolver;
            routeMapper1 = routeMapper;
        }

        public override void Process(RequestBeginArgs args)
        {
            try
            {
                Assert.ArgumentNotNull(args, "args");
                if (Sitecore.Context.Item != null || Sitecore.Context.Database == null)
                    return;

                string localUrl = GetPath(args);

                if(string.IsNullOrEmpty(localUrl)) return;
                if (!localUrl.StartsWith("/people"))
                {

                    return;
                }

                var itemPathParts = localUrl.Split('/');
                if (itemPathParts.Length == 0)
                {

                   return;
                }

                var articleName = itemPathParts[itemPathParts.Length - 1].Replace('-', ' ').ToLower();

                if (string.IsNullOrEmpty(articleName))
                {
                    return;
                }


                var index = Sitecore.ContentSearch.ContentSearchManager.GetIndex(String.Format("sitecore_master_index", Sitecore.Context.Database?.Name));

                using (var searchContext = index.CreateSearchContext())
                {
                    var query = searchContext.GetQueryable<CustomSearchResult>().Where(x => x.SearchName == articleName);
                    var results = query.GetResults().ToList();
                    var page = results.FirstOrDefault().Document;
                    Sitecore.Context.Item = Sitecore.Context.Database.GetItem(page.ItemId);
                }
            }
            catch (Exception ex)
            {
                return;

            }
        }


        protected virtual string GetPath(RequestBeginArgs args)
        {
            RequestContext requestContext = args.PageContext.RequestContext;
            if (requestContext == null)
            {
                return null;
            }

            if (!routeMapper1.IsLayoutServiceRoute(requestContext))
            {
                return null;
            }

            string text = args.PageContext.RequestContext.HttpContext.Request.QueryString?["item"];
            if (string.IsNullOrWhiteSpace(text))
            {
                return null;
            }

            return StripVirtualFolderPath(text);
        }

        private string StripVirtualFolderPath(string path)
        {
            string virtualFolder = Context.Site.VirtualFolder;
            if (!string.IsNullOrWhiteSpace(path) && virtualFolder.Length > 0 && virtualFolder != "/")
            {
                string text = StringUtil.EnsurePostfix('/', virtualFolder);
                string text2 = StringUtil.EnsurePostfix('/', path);
                if (text2.StartsWith(text, StringComparison.InvariantCultureIgnoreCase))
                {
                    path = StringUtil.Mid(path, text.Length);
                }

                path = string.Join("", "/", path);
            }

            return path;
        }
    }
}