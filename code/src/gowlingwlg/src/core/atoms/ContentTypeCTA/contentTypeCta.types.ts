import { ComponentProps } from 'lib/component-props';

export type ContentTypeCTAProps = ComponentProps & {
  fields: {
    data: {
      item: {
        referenceItem: {
          targetItem: {
            title: {
              jsonValue: {
                value: string;
              };
            };
            publishedDate: {
              jsonValue: {
                value: string;
              };
            };
            pageType: {
              targetItem: {
                pageType: { jsonValue: { value: string } };
                icon: { jsonValue: { value: string } };
              };
            };
          };
        };
        CallToAction: {
          jsonValue: {
            value: {
              href: string;
              text: string;
            };
          };
        };
      };
    };
  };
};
declare global {
  interface Window {
    contentTypeCtaDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  event_title?: string;
}
export const handleCtaClick = (title: string) => {
  const eventData: DataLayerEvent = {
    event: 'register_webinar_initiated',
    event_title: title,
  };
  window.dataLayer.push(eventData);
};
