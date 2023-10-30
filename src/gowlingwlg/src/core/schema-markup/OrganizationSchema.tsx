const OrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gowling WLG',
  legalName: 'Gowling WLG',
  url: 'https://www.gowlingwlg.com',
  logo: {
    '@type': 'ImageObject',
    url: '',
    alt: 'Gowling WLG Logo',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1600, 421 7th Avenue SW',
    addressLocality: 'Calgary',
    addressRegion: 'Alberta',
    postalCode: 'T2P 4K9',
    addressCountry: 'Canada',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1 403-298-1000',
  },
  sameAs: [
    'https://twitter.com/gowlingwlg',
    'https://www.instagram.com/gowlingwlg',
    'https://www.youtube.com/@GowlingWLG-legal',
    'https://www.linkedin.com/company/gowlingwlg/',
  ],
};

export default OrganizationSchema;
