type BreadcrumbItem = {
  Title: string;
  Url: string;
};

export const BreadcrumbListSchema = (breadcrumbData: BreadcrumbItem[]) => {
  const itemListElement = breadcrumbData.map((item: BreadcrumbItem, index: number) => {
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: item.Title,
      item: item.Url,
    };
  });

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };

  return breadcrumbListSchema;
};
