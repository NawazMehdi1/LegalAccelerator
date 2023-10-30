const WebPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  url: '',
  headline: 'In tune with your world',
  description: '',
  inLanguage: '',
  speakable: {
    '@type': 'SpeakableSpecification',
    xpath: ['/html/head/title', "/html/head/meta[@name='description']/@content"],
  },
};
export default WebPageSchema;
