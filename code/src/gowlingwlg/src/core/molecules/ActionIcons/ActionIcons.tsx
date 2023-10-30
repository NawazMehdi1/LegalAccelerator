import { ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';

type IconsProps = {
  icons: {
    name: string;
    image: {
      jsonValue: ImageField;
    };
  }[];
  iconClassName: string;
};
interface DataLayerEvent {
  event: string;
}

export const handleIconClick = (event: string) => {
  const eventData: DataLayerEvent = {
    event,
  };
  window.dataLayer.push(eventData);
};
const handleActionItems = (actionItem: string): void => {
  switch (actionItem) {
    case 'Download':
      handleIconClick('insight_detail_download_cta_click');
      break;
    case 'Share':
      handleIconClick('insight_detail_share_cta_click');
      break;
    case 'Print':
      window.print();
      handleIconClick('insight_detail_print_cta_click');
      break;
    default:
      break;
  }
};

const ActionIcons = (props: IconsProps): JSX.Element => {
  return (
    <>
      {props.icons?.map((icon, index) => {
        return (
          <button
            className="flex"
            title={icon.name}
            role={icon.name}
            key={`${index}-action-icons`}
            onClick={() => handleActionItems(icon.name)}
          >
            <Image field={icon.image?.jsonValue} className={props.iconClassName} />
          </button>
        );
      })}
    </>
  );
};

export default ActionIcons;
