import CTA, { CTAProps } from 'core/atoms/CTA/LargeMedPurpleBg2Col/CTA';
import { render } from '@testing-library/react';

jest.mock('core/atoms/ui/tooltips');
jest.mock('lucide-react', () => ({
  AlertCircle: jest.fn(),
}));

const componentProps: CTAProps = {
  rendering: {
    uid: '006130e8-5722-4a5e-9485-7a5fb4d7b4bb',
    componentName: 'CTA',
    dataSource: '/sitecore/content/GowlingWLG/GowlingWLG/Home/QA/CampaignBanner/Data/CTA',
    params: {
      FieldNames: 'LargeMedPurpleBg2Col',
      Styles: 'bg-lightBlue',
      DynamicPlaceholderId: '1',
    },
    fields: {
      AlertDescription: { value: 'Please make sure you have saved your data.' },
      AlertTitle: { value: 'Attention: You are redirecting to new page.' },
      CTALink: {
        value: {
          href: 'https://twitter.com',
          text: 'External',
          linktype: 'external',
          url: 'https://twitter.com',
          anchor: '',
          target: 'Custom',
        },
      },
      Description: {
        value:
          '&nbsp;Above requirements are listed basis the default language and region i.e. English and Global and may/may not vary basis another selected language or region.',
      },
      Image: {
        value: {
          src: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/webimage-Event-email-banner-seminar-photo.png',
          width: '800',
          height: '676',
          alt: 'Event email banner seminar photo',
          asset: {
            id: '9E0CC814-0F0E-445B-92D65DBCF73949D8',
            name: 'Event email banner seminar photo',
            description: null,
            assetType: 'Image',
            createDate: null,
            publishDate: null,
            updateDate: null,
            files: [
              {
                name: 'original',
                url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/original/Event-email-banner-seminar-photo.jpg',
                width: 355,
                height: 300,
                fileSize: 24918,
              },
              {
                name: 'webImage',
                url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/webimage-Event-email-banner-seminar-photo.png',
                width: 800,
                height: 676,
                fileSize: 0,
              },
              {
                name: 'thumbnail',
                url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/thul-Event-email-banner-seminar-photo.png',
                width: 250,
                height: 211,
                fileSize: 0,
              },
              {
                name: 'mini',
                url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/mini-Event-email-banner-seminar-photo.png',
                width: 80,
                height: 80,
                fileSize: 0,
              },
            ],
            metaproperties: {
              Channel: ['Email'],
              Asset_Subtype: ['Banners_-_Emails'],
              extension: ['jpg'],
              Asset_Type: ['imagery'],
            },
          },
        },
      },
      IsImageRight: { value: false },
      Title: { value: 'In mobile view, all the elements shall be added in a stack structure.' },
    },
  },
  fields: {
    AlertDescription: { value: 'Please make sure you have saved your data.' },
    AlertTitle: { value: 'Attention: You are redirecting to new page.' },
    CTALink: {
      value: {
        href: 'https://twitter.com',
        text: 'External',
        linktype: 'external',
        url: 'https://twitter.com',
        anchor: '',
        target: 'Custom',
      },
    },
    Description: {
      value:
        '&nbsp;Above requirements are listed basis the default language and region i.e. English and Global and may/may not vary basis another selected language or region.',
    },
    Image: {
      value: {
        src: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/webimage-Event-email-banner-seminar-photo.png',
        width: '800',
        height: '676',
        alt: 'Event email banner seminar photo',
        asset: {
          id: '9E0CC814-0F0E-445B-92D65DBCF73949D8',
          name: 'Event email banner seminar photo',
          description: null,
          assetType: 'Image',
          createDate: null,
          publishDate: null,
          updateDate: null,
          files: [
            {
              name: 'original',
              url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/original/Event-email-banner-seminar-photo.jpg',
              width: 355,
              height: 300,
              fileSize: 24918,
            },
            {
              name: 'webImage',
              url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/webimage-Event-email-banner-seminar-photo.png',
              width: 800,
              height: 676,
              fileSize: 0,
            },
            {
              name: 'thumbnail',
              url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/thul-Event-email-banner-seminar-photo.png',
              width: 250,
              height: 211,
              fileSize: 0,
            },
            {
              name: 'mini',
              url: 'https://brandconnect.gowlingwlg.com/m/7d9b304d0c0d20ad/mini-Event-email-banner-seminar-photo.png',
              width: 80,
              height: 80,
              fileSize: 0,
            },
          ],
          metaproperties: {
            Channel: ['Email'],
            Asset_Subtype: ['Banners_-_Emails'],
            extension: ['jpg'],
            Asset_Type: ['imagery'],
          },
        },
      },
    },
    IsImageRight: { value: false },
    Title: { value: 'In mobile view, all the elements shall be added in a stack structure.' },
  },
  params: {
    FieldNames: 'LargeMedPurpleBg2Col',
    Styles: 'bg-lightBlue',
    DynamicPlaceholderId: '1',
    styles: ' bg-lightBlue',
  },
};

describe('CTA', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders a CTA', () => {
    const rendered = render(<CTA {...componentProps} />);

    expect(rendered.getByTestId('cta-detail')).toBeTruthy();
  });
});
