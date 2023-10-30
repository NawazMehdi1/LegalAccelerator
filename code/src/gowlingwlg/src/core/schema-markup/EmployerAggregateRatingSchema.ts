const EmployerAggregateRatingSchema = {
  '@context': 'https://schema.org/',
  '@type': 'EmployerAggregateRating',
  itemReviewed: {
    '@type': 'Organization',
    name: "World's Best Law Firm",
    sameAs: 'https://gowlingwlg.com',
  },
  ratingValue: '91',
  bestRating: '100',
  worstRating: '1',
  ratingCount: '10561',
};
export default EmployerAggregateRatingSchema;
