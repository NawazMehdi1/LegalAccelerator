export function formatDate(date: string | undefined): string | undefined {
  if (!date || date === '0001-01-01T00:00:00Z') {
    return '';
  }
  const dateToFormat: Date | undefined = date ? new Date(date) : undefined;

  const prettyDate = dateToFormat?.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return prettyDate;
}

export const newFormatDate = (dateString: string, language: string) => {
  if (!dateString || dateString === '0001-01-01T00:00:00Z') {
    return '';
  }
  const date = new Date(dateString);
  const day = date.getUTCDate(); // Use UTC methods
  const formattedDay = day < 10 ? `${day}` : day;
  let month = date.toLocaleString(language, { month: 'long', timeZone: 'UTC' }); // Specify UTC timezone

  if (language === 'fr-FR') {
    month = month.toLowerCase();
  }

  const year = date.getUTCFullYear(); // Use UTC methods
  return `${formattedDay} ${month} ${year}`;
};
