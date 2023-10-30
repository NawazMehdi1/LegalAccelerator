import { Text, Link } from '@sitecore-jss/sitecore-jss-nextjs';
import { LinkListProps, ResultsFieldLink } from '../LinkList.types';

const LinkList = (props: LinkListProps) => {
  const datasource = props.fields?.data?.datasource;
  const styles = `component link-list ${props?.params?.styles}`.trimEnd();
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={styles} id={id ? id : undefined}>
      <div className="component-content">
        <Text
          tag="h4"
          className="body-text font-bold leading-loose mb-[10px]"
          field={datasource?.field?.title}
        />
        <ul data-testid="link-list">
          {datasource?.children?.results
            ?.filter((element: ResultsFieldLink) => element?.field?.link)
            .map((element: ResultsFieldLink, index: number) => (
              <li key={`${index}-link-list`}>
                <Link field={element?.field?.link} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LinkList;
