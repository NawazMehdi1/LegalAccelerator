import { LinkListProps, ResultsFieldLink } from '../LinkList.types';
import LinkListItem from './LinkListItem';

declare global {
  interface Window {
    globalMenuDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  menu_title?: string;
  menu_link?: string;
}
const handleMenuClick = (title: string, url: string) => {
  const eventData: DataLayerEvent = {
    event: 'global_menu_click',
    menu_title: title,
    menu_link: url,
  };
  window.dataLayer.push(eventData);
};

const LinkList = (props: LinkListProps): JSX.Element => {
  const datasource = props.fields?.data?.datasource;
  const id = props.params.RenderingIdentifier;

  const list = datasource?.children?.results
    ?.filter((element: ResultsFieldLink) => element?.field?.link)
    .map((element: ResultsFieldLink, key: number) => {
      const isInvalid = ['', null, undefined].includes(element?.field?.link?.value?.text);
      return (
        <div
          key={`${key}${element?.field?.link}`}
          onClick={() =>
            handleMenuClick(
              element?.field?.link?.value?.text || '',
              element?.field?.link?.value?.href || ''
            )
          }
        >
          {!isInvalid && (
            <LinkListItem
              total={datasource?.children?.results?.length}
              field={element?.field?.link}
              key={`${key}${element?.field?.link}`}
            />
          )}
        </div>
      );
    });

  return (
    <div className="hidden grow md:flex justify-between" id={id ? id : undefined}>
      <nav className="md:flex text-15.1 font-arial grow justify-end">{list}</nav>
    </div>
  );
};

export default LinkList;
