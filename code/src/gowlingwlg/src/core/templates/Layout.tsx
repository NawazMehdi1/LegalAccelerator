import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Placeholder,
  LayoutServiceData,
  Field,
  useSitecoreContext,
  HTMLLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import OrganizationSchema from '../schema-markup/OrganizationSchema';
import WebpageSchema from '../schema-markup/WebpageSchema';
import SearchSchema from '../schema-markup/SearchSchema';
import ArticleSchema from '../schema-markup/ArticleSchema';
import EventSchema from '../schema-markup/EventSchema';
import EmployerAggregateRatingSchema from '../schema-markup/EmployerAggregateRatingSchema';
import { BreadcrumbListSchema } from '../schema-markup/BreadcrumbListSchema';
import Scripts from 'core/atoms/Scripts';
import Seo from '../atoms/Seo';
import { SeoProps } from '../atoms/Seo/seo.types';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { getPublicUrl } from '@sitecore-jss/sitecore-jss-nextjs/utils';

// Prefix public assets with a public URL to enable compatibility with Sitecore Experience Editor.
// If you're not supporting the Experience Editor, you can remove this.
const publicUrl = getPublicUrl();

interface LayoutProps {
  layoutData: LayoutServiceData;
  headLinks: HTMLLink[];
}

interface RouteFields {
  [key: string]: unknown;
  name: string;
  Title?: Field<string>;
  MetaDescription: Field<string>;
  MetaKeywords: Field<string>;
  Jurisdictions: {
    fields: {
      Phrase: Field<string>;
      Title: {
        value: string;
      };
    };
  }[];
  PageType?: {
    fields: {
      PageType: Field<string>;
      Icon: {
        value: {
          src: string;
        };
      };
    };
    name: string;
  };
  PublishedDate?: Field<string>;
  Content?: Field<string>;
  Image: {
    value?: {
      asset?: {
        files?: Array<{ name?: string; url?: string }>;
      };
    };
  };
  CategoryType?: {
    name: string;
    fields?: {
      Icon?: {
        value?: {
          src?: string;
        };
      };
      PageType?: Field<string>;
    };
  };
  ['Related Sectors']: Array<{
    fields: {
      Title: Field<string>;
    };
  }>;
  ['Related Services']: Array<{
    fields: {
      Title: Field<string>;
    };
  }>;
  ['Related Topics']: Array<{
    fields: {
      Title: Field<string>;
    };
  }>;
  IsCPDorCLE: {
    value: boolean;
  };
  EventStartDate: {
    value: string;
  };
  EventEndDate: {
    value: string;
  };
  Offices: {
    fields: {
      Title: {
        value: string;
      };
    };
  }[];
}
type BreadcrumbItem = {
  Title: string;
  Url: string;
};
const Layout = ({ layoutData, headLinks }: LayoutProps): JSX.Element => {
  const { route } = layoutData.sitecore;
  const fields = route?.fields as RouteFields;
  const isPageEditing = layoutData.sitecore.context.pageEditing;
  const mainClassPageEditing = isPageEditing ? 'editing-mode' : 'prod-mode';
  const { sitecoreContext } = useSitecoreContext();
  const { asPath } = useRouter();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const [scrolling, setScrolling] = useState(false);
  const pageName = route?.name.toLowerCase();
  const pageType = fields?.PageType?.name.toLowerCase();
  const categoryType = fields?.CategoryType?.name.toLowerCase();
  const logoURL =
    process.env.NEXT_PUBLIC_URL +
      (typeof sitecoreContext.LogoURLRelativePath === 'string'
        ? sitecoreContext.LogoURLRelativePath
        : '') ||
    'localhost:3000' +
      (typeof sitecoreContext.LogoURLRelativePath === 'string'
        ? sitecoreContext.LogoURLRelativePath
        : '');
  let schemaMarkup = null;
  if (pageName === 'career') {
    schemaMarkup = EmployerAggregateRatingSchema;
  }
  const imageUrls = (fields.Image?.value?.asset?.files || []).map((file) => file.url);
  if (pageType === 'article' || categoryType === 'news') {
    const keyContacts = Array.isArray(fields['Key Contacts'])
      ? fields['Key Contacts']
      : [fields['Key Contacts']];
    schemaMarkup = {
      ...ArticleSchema,
      headline: fields.Title?.value || '',
      image: imageUrls,
      datePublished: fields.PublishedDate?.value || '',
      dateModified: fields.PublishedDate?.value || '',
      author: keyContacts.map((contact: { name: string; url: string }) => ({
        '@type': 'Person',
        name: contact?.name || '',
        url: contact?.url || '',
      })),
    };
  }
  if (categoryType === 'events') {
    schemaMarkup = {
      ...EventSchema,
      name: fields.Title?.value || '',
      startDate: fields.EventStartDate?.value || '',
      endDate: fields.EventEndDate?.value || '',
      image: imageUrls,
      location: {
        '@type': 'VirtualLocation',
        url: `${process.env.PUBLIC_URL || ''}${sitecoreContext?.itemPath || ''}`,
      },
      description: fields.MetaDescription?.value || '',
    };
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleRefresh = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleRefresh);

    return () => {
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, []);

  useEffect(() => {
    // Check if the page was refreshed
    const pageRefreshed = localStorage.getItem('pageRefreshed') === 'true';

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      setScrolling(currentScrollPosition > 0);
      // Save the scroll position in local storage
      localStorage.setItem('scrollPosition', currentScrollPosition.toString());
    };

    // Run the handleScroll function immediately if the page was refreshed
    if (pageRefreshed) {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);

    // Set a flag in localStorage to indicate that the page has been refreshed
    localStorage.setItem('pageRefreshed', 'true');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const isNeedScrolling = sitecoreContext.route?.name == 'Home';

  const url = process?.env?.NEXT_PUBLIC_URL || 'localhost:3000' + asPath;
  const isHomePage = asPath === '/';
  WebpageSchema.url = (sitecoreContext?.itemPath || '') as string;
  WebpageSchema.inLanguage = sitecoreContext?.language || '';
  WebpageSchema.description = fields?.MetaDescription?.value || '';
  const breadcrumbData = (sitecoreContext?.Breadcrumb || []) as BreadcrumbItem[];
  const breadcrumbListSchema = BreadcrumbListSchema(breadcrumbData);
  OrganizationSchema.logo.url = logoURL;

  const metaList = [
    {
      name: 'jurisdictions',
      content: fields?.Jurisdictions?.map(
        (jurisdiction) => jurisdiction?.fields?.Phrase?.value
      ).toString(),
    },
    { name: 'title', content: fields?.Title?.value },
    { name: 'publishedDate', content: fields?.PublishedDate?.value },
    { name: 'pageType', content: fields?.PageType?.fields?.PageType?.value },
    { name: 'pageTypeIcon', content: fields?.PageType?.fields?.Icon?.value?.src },
    { name: 'thumbnailImage', content: fields?.Image?.value?.asset?.files?.[1]?.url },
    { name: 'url', content: url },
    { name: 'categoryType', content: fields?.CategoryType?.fields?.PageType?.value },
    { name: 'categoryTypeIcon', content: fields?.CategoryType?.fields?.Icon?.value?.src },
    { name: 'id', content: sitecoreContext?.itemId },
    {
      name: 'sectors',
      content: fields['Related Sectors']?.map((sector) => sector?.fields?.Title?.value).toString(),
    },
    {
      name: 'services',
      content: fields['Related Services']
        ?.map((service) => service?.fields?.Title?.value)
        .toString(),
    },
    {
      name: 'topics',
      content: fields['Related Topics']?.map((topic) => topic?.fields?.Title?.value).toString(),
    },
    { name: 'MetaDescription', content: fields?.MetaDescription?.value },
    { name: 'MetaKeywords', content: fields?.MetaKeywords?.value },
    { name: 'IsCPDorCLE', content: fields?.IsCPDorCLE?.value?.toString() },
    { name: 'EventStartDate', content: fields?.EventEndDate?.value },
    { name: 'eventEndDate', content: fields?.EventEndDate?.value },
    {
      name: 'offices',
      content: fields?.Offices?.map((office) => office?.fields?.Title?.value).toString(),
    },
  ].filter((meta) => meta.content !== undefined);
  return (
    <>
      <Scripts />
      <Head>
        <title>{fields?.Title?.value?.toString() || 'Page'}</title>
        <link rel="icon" href={`${publicUrl}/favicon.ico`} />
        {headLinks?.map((headLink) => (
          <link rel={headLink?.rel} key={headLink?.href} href={headLink?.href} />
        ))}
        {metaList.map((meta) => (
          <meta name={meta.name} content={meta.content} key={meta.name}></meta>
        ))}
        {isHomePage && (
          <script type="application/ld+json">{JSON.stringify(OrganizationSchema)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(WebpageSchema)}</script>
        {breadcrumbData.length > 0 && breadcrumbListSchema && (
          <script type="application/ld+json">{JSON.stringify(breadcrumbListSchema)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(SearchSchema)}</script>
        {schemaMarkup && <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>}
        <script
          type="text/javascript"
          src="https://platform-api.sharethis.com/js/sharethis.js#property=651c1c052e87700013335f94&product=sop"
          async={true}
        ></script>
      </Head>
      <Seo {...(fields as unknown as SeoProps)}></Seo>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${sitecoreContext.GTMContainerID}');`,
        }}
      ></Script>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${sitecoreContext.GTMContainerID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      {/* root placeholder for the app, which we add components to using route data */}
      <div className={mainClassPageEditing}>
        <header className="print:hidden">
          <div
            id="header"
            className={`${isEditing ? '' : 'fixed inset-x-0 top-0 z-20'} ${
              isNeedScrolling
                ? `${scrolling ? 'bg-white border-mediumGrey border-solid border-b-[1px]' : ' '}`
                : 'bg-white border-mediumGrey border-solid border-b-[1px]'
            }`}
          >
            {route && <Placeholder name="headless-header" rendering={route} />}
          </div>
        </header>
        <main className="mt-[72px] md:mt-[100px] print:mt-0">
          <div id="content" className={isEditing ? 'min-h-[90vh]' : ''}>
            {route && <Placeholder name="headless-main" rendering={route} />}
          </div>
        </main>
        <footer className="print:hidden">
          <div id="footer">{route && <Placeholder name="headless-footer" rendering={route} />}</div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
