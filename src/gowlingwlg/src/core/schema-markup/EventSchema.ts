const EventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: '',
  startDate: '',
  endDate: '',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  location: {
    url: '',
  },
  image: [],
  description: '',
  organizer: {
    '@type': 'Organization',
    name: 'Gowling WLG',
    url: 'https://www.gowlingwlg.com/',
  },
};
export default EventSchema;
