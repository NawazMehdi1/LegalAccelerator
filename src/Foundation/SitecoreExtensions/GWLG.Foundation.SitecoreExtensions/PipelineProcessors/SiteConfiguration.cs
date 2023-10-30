using Newtonsoft.Json.Linq;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.LayoutService.ItemRendering.Pipelines.GetLayoutServiceContext;
using Sitecore.Links.UrlBuilders;
using Sitecore.Links;
using System.Collections.Generic;
using GWLG.Foundation.SitecoreExtensions.Helper;
using Sitecore.Mvc.Extensions;

namespace GWLG.Foundation.SitecoreExtensions.PipelineProcessors
{
    public class SiteConfiguration : IGetLayoutServiceContextProcessor
    {
        public const string Breadcrumb = "Breadcrumb";
        public const string GTMContainerID = "GTMContainerID";
        public const string SearchApiUrl = "SearchApiUrl";
        public const string SearchSource = "SearchSource";
        public const string ExternalLinkToolTipText = "ExternalLinkToolTipText";
        public const string NavigationTitle = "NavigationTitle";
        public const string PageTitle = "Title";
        public const string TitleField = "Title";
        public const string UrlField = "Url";
        public const string HideInBreadcrumb = "HideInBreadcrumb";
        public const string LogoURL = "LogoURLRelativePath";


        public void Process(GetLayoutServiceContextArgs args)
        {
            if (Sitecore.Context.Site != null)
            {
                var siteConfigurationItem = SiteUtility.GetSiteConfigurationItem();
                if (siteConfigurationItem != null)
                {
                    args.ContextData.Add(GTMContainerID, siteConfigurationItem.Fields[GTMContainerID]?.Value);
                    args.ContextData.Add(SearchApiUrl, siteConfigurationItem.Fields[SearchApiUrl]?.Value);
                    args.ContextData.Add(SearchSource, siteConfigurationItem.Fields[SearchSource]?.Value);
                    args.ContextData.Add(ExternalLinkToolTipText, siteConfigurationItem.Fields[ExternalLinkToolTipText]?.Value);
                    args.ContextData.Add(LogoURL, siteConfigurationItem.Fields[LogoURL]?.Value);
                }
            }

            if (Sitecore.Context.Item != null)
            {
                JArray breadcrumbItems = GetBreadcrumb();
                if (breadcrumbItems.Count > 0)
                {
                    args.ContextData.Add(Breadcrumb, breadcrumbItems);
                }

            }
        }


        public JArray GetBreadcrumb()
        {
            JArray jArray = new JArray();
            List<Item> breadcrumbs = new List<Item>();
            Item currentItem = Sitecore.Context.Item;
            Item homeItem = Sitecore.Context.Database.GetItem(Sitecore.Context.Site.StartPath);
            if (currentItem != null && homeItem != null)
            {
                ItemUrlBuilderOptions urlOptions = LinkManager.GetDefaultUrlBuilderOptions();
                urlOptions.SiteResolving = false;
                urlOptions.AlwaysIncludeServerUrl = false;
                urlOptions.ShortenUrls = true;
                urlOptions.LowercaseUrls = true;

                if (!(currentItem.ID.Equals(homeItem.ID)))
                {
                    CheckboxField HideBreadcrumb = currentItem.Fields[HideInBreadcrumb];
                    if (HideBreadcrumb != null && !HideBreadcrumb.Checked)
                    {
                        while (currentItem != null)
                        {
                            breadcrumbs.Add(currentItem);

                            if (currentItem.ID.Equals(homeItem.ID))
                            {
                                break;
                            }
                            currentItem = currentItem.Parent;
                        }
                        breadcrumbs.Reverse();
                        foreach (Item item in breadcrumbs)
                        {
                            var TitleName = item[NavigationTitle] != "" ? item[NavigationTitle] : item[PageTitle];
                            if (TitleName.IsEmptyOrNull())
                            {
                                TitleName = item.Name;

                            }
                            JObject jobject = new JObject()
                         {
                             { TitleField, TitleName },
                             { UrlField, LinkManager.GetItemUrl(item, urlOptions) }
                         };
                            jArray.Add(jobject);
                            
                        }
                    }
                }
                
                return jArray;
            }

            return jArray;


        }
    }
    }