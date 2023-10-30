using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Sitecore.Data.Items;
using Sitecore.Data;

namespace GWLG.Foundation.SitecoreExtensions.Helper
{
    public static class SiteUtility
    {
        public static ID SettingItemId = new ID ("{EE3244BB-660C-4A6B-9035-900E1D95A33A}");
        public static ID SiteConfigTemplateId= new ID ("{BFD2102F-C999-43CA-ABEE-C41978D1CB25}");
        public static Item GetSiteConfigurationItem()
        {
            Item SettingItem=Sitecore.Context.Database.GetItem(SettingItemId);
            var SiteConfigItem = SettingItem.Axes.GetDescendants().Where(x=>x.TemplateID== SiteConfigTemplateId).First();
            return SiteConfigItem;
        }
    }
}