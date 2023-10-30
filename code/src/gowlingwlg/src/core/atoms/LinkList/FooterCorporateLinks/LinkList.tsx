import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListProps, ResultsFieldLink } from '../LinkList.types';
import LinkListItem from './LinkListItem';

const LinkList = ({ fields }: LinkListProps): JSX.Element => {
  const datasource = fields?.data?.datasource;

  if (datasource) {
    const list = datasource?.children?.results
      ?.filter((element: ResultsFieldLink) => element?.field?.link)
      .map((element: ResultsFieldLink, key: number) => {
        const isInvalid = ['', null, undefined].includes(element?.field?.link?.value?.text);
        return (
          <div key={`${key}${element?.field?.link}`}>
            {!isInvalid && (
              <LinkListItem
                total={datasource?.children?.results?.length}
                field={element?.field?.link}
              />
            )}
          </div>
        );
      });

    return (
      <>
        <Text tag="h3" field={datasource?.field?.title} />
        <div className="grid grid-rows-2 md:grid-cols-3 xl:grid-cols-6 md:grid-rows-2 xl:grid-rows-1 max-w-[1200px] 2xl:max-w-[1440px] pb-[38px] mx-[22px] md:mx-[34px] xl:m-auto md:border-t-[1px] border-mediumGrey border-solid  md:pt-[54px]">
          {list}
        </div>
      </>
    );
  }

  return (
    <div>
      <h3>Link List</h3>
    </div>
  );
};

export default LinkList;
