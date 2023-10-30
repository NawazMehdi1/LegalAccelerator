const SearchSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Gowling WLG',
  url: 'https://www.gowlingwlg.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://gowlingwlg.com/en/search-results/?q={search_term_string}&mode=anyword&sort=Relevance&page=1`,
    },
    'query-input': 'required name=search_term_string',
  },
  keywords: ['Business process outsourcing', 'IP Law', 'other keywords'],
};
export default SearchSchema;
