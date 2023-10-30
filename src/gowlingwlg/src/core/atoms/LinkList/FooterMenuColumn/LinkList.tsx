import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListProps, ResultsFieldLink } from '../LinkList.types';
import LinkListItem from '../LinkListItem';

const LinkList = ({ fields }: LinkListProps): JSX.Element => {
  const datasource = fields?.data?.datasource;
  if (datasource) {
    const list = datasource?.children?.results
      ?.filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const isInvalid = ['', null, undefined].includes(element?.field?.link?.value?.text);
        return !isInvalid ? (
          <LinkListItem
            key={`${key}${element?.field?.link}`}
            total={datasource?.children?.results?.length}
            field={element?.field?.link}
          />
        ) : null;
      });

    return (
      <>
        <Text tag="h3" field={datasource?.field?.title} />
        <nav className="flex flex-col gap-4 font-bold text-lg text-mediumGrey font-arial">
          {list}
        </nav>
      </>
    );
  }
  return <></>;
};

export default LinkList;
