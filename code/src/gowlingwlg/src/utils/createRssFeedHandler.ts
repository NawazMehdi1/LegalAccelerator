import getRssFeedData from 'data/rss/getRssFeedData';
import dayjs from 'dayjs';
import he from 'he';
import { sitecorePagePropsFactory } from 'lib/page-props-factory';
import { NextApiRequest, NextApiResponse } from 'next';

const MAX_PAGE_SIZE = 100;
const FALLBACK_LANG = 'en';
const FALLBACK_COUNTRY = 'GB';

const generateRssFeed = async (
  language: string,
  country: string,
  link: string,
  limit: number,
  type: string,
  topic?: string
) => {
  const data = [];
  let nextSet = true;
  let page = 0;

  const pageData = await sitecorePagePropsFactory.create({
    params: { path: [] },
    locale: language,
  });

  const { SearchApiUrl, SearchSource } = pageData?.layoutData?.sitecore?.context || {};
  const { Title } = pageData?.layoutData?.sitecore?.route?.fields as {
    Title?: { value: string };
  };

  const metadata = {
    title: Title?.value,
    description: Title?.value,
    link,
  };

  // Perform callbacks to Sitecore in a loop until all page batches have been retrieved
  while (nextSet) {
    // This callback will retrieve a single batch of pages (up to 100)
    const response = await getRssFeedData(SearchApiUrl as string, {
      searchSource: SearchSource as string,
      language,
      country: country.toLocaleLowerCase(),
      type,
      limit,
      offset: page,
      topic,
    });

    const result = response?.widgets?.[0];

    if (result) {
      const maxPages = Math.ceil(result.total_item / limit);

      data.push(...(result.content || []));

      // Determine from GraphQL response if there is another batch of pages
      nextSet = page <= maxPages;

      // Set the cursor to the next batch of pages
      page += 1;
    } else {
      nextSet = false;
    }
  }

  const items = data.reduce((acc, item) => {
    const intemData = `
      ${item.id ? `<guid isPermaLink="false">${item.id}</guid>` : ''}
      ${item.url ? `<link>${item.url}</link>` : ''}
      ${item.name ? `<title>${he.decode(item.name).replace(/&/g, '&amp;')}</title>` : ''}
      ${
        item.description
          ? `<description>${he.decode(item.description).replace(/&/g, '&amp;')}</description>`
          : ''
      }
      ${
        item.published_date
          ? `<pubDate>${dayjs(item.published_date).format('ddd, DD MMM YYYY HH:mm:ss')} Z</pubDate>`
          : ''
      }
    `;
    return intemData.length
      ? `${acc}
        <item>
          ${intemData}
        </item>`
      : acc;
  }, '');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>${metadata.title}</title>
        <link>${metadata.link}</link>
        <description>${metadata.description}</description>
        ${items}
      </channel>
    </rss>`;

  return sitemap;
};

const createRssFeedHandler =
  (type: string) =>
  async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse | void> => {
    if (req.method === 'GET') {
      const topic = req.query.topic as string;
      const [language = FALLBACK_LANG, country = FALLBACK_COUNTRY] =
        (req.query.locale as string)?.split('-') || Array(2);
      const link =
        req[
          Reflect.ownKeys(req).find(
            (s) => String(s) === 'Symbol(NextInternalRequestMeta)'
          ) as keyof typeof req
        ]?.__NEXT_INIT_URL;

      const sitemap = await generateRssFeed(language, country, link, MAX_PAGE_SIZE, type, topic);
      const cleanSitemap = sitemap
        .replace(/\n|\t/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><');

      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      return res.status(200).send(cleanSitemap);
    }

    return res.status(500).send('Unknown method');
  };

export default createRssFeedHandler;
