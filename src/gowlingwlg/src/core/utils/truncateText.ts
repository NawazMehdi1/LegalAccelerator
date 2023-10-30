export const truncateText = (maxLength: number, text: string | undefined) => {
  if (text && text.length > maxLength) {
    return text?.substring(0, maxLength) + '...';
  }
  return text;
};
