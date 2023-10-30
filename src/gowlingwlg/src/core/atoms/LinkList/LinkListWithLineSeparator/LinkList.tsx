import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListProps, ResultsFieldLink } from '../LinkList.types';

const LinkList = (props: LinkListProps) => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props?.params?.styles}`.trimEnd();
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content md:pl-[0.875rem] md:mt-[2.813rem] mt-[1.875rem] md:px-0 px-[1.25rem]">
        <Text
          tag="h4"
          className="body-text font-bold mb-[0.625rem] tracking-[0rem] text-black leading-normal"
          field={datasource?.field?.title}
        />
        <ul
          data-testid="link-list"
          className="block md:grid grid-cols-4 [&>*:nth-child(5n)]:border-b-0 grid-flow-col grid-rows-5"
        >
          {datasource?.children?.results
            ?.filter((element: ResultsFieldLink) => element?.field?.link)
            .map((element: ResultsFieldLink, index: number) => (
              <li
                key={`${index}-link-list`}
                className="md:text-black text-white hover:font-bold md:border-b md:border-darkGrey md:pb-[1.188rem] md:mb-[1.188rem] mb-[0.5rem] leading-[156%]"
              >
                <Link field={element?.field?.link} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkList;
