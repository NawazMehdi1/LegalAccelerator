/* eslint-disable react-hooks/exhaustive-deps */
import { useSitecoreContext, Text, Link as JssLink } from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'core/atoms/Image';
import { useI18n } from 'next-localization';
import Link from 'next/link';
import Head from 'next/head';
import { useEffect } from 'react';
import {
  ProfileDetailProps,
  AdmissionParentResult,
  AdmissionChildResult,
  BarAdmissionType,
  AdmissionGrandchildResult,
  ContextFields,
  IconType,
  OfficeType,
  SectorsType,
  ServicesType,
} from './profileDetails.types';
import DownloadPageAsPdf from 'core/atoms/DownloadPageAsPdf';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vCard, { jCard } from 'vcf';

declare global {
  interface Window {
    profileDataLayer: DataLayerEvent[];
  }
}

interface DataLayerEvent {
  event: string;
  profile_name?: string;
  profile_title?: string;
  profile_office?: string;
  profile_services?: string;
  insight_sectors?: string;
}

const ProfileDetail = ({ fields }: ProfileDetailProps): JSX.Element => {
  const { t } = useI18n();
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const offices = fields?.data?.item?.offices?.targetItems || [];
  const sectors = fields?.data?.item?.sectors?.targetItems || [];
  const services = fields?.data?.item?.services?.targetItems || [];

  const barAdmissionResults: AdmissionParentResult[] = (fields?.data?.item?.barAdmission?.results ||
    []) as AdmissionParentResult[];
  const admissionDataArray: BarAdmissionType[] = [];

  barAdmissionResults.forEach((parentResult: AdmissionParentResult) => {
    const childrenResults = parentResult?.children?.results || [];

    childrenResults.forEach((childResult: AdmissionChildResult) => {
      const AdmissionGrandchildResults = childResult?.children?.results || [];

      AdmissionGrandchildResults.forEach((grandchildResult: AdmissionGrandchildResult) => {
        const admissionType = grandchildResult?.admissionType?.value || '';
        const admissionName = grandchildResult?.admissionName?.value || '';
        const startYear = grandchildResult?.startYear?.value || '';

        admissionDataArray.push({
          admissionType: {
            value: admissionType,
          },
          admissionName: {
            value: admissionName,
          },
          startYear: {
            value: startYear,
          },
        });
      });
    });
  });
  const alternateTitle = fields?.data?.item?.alternateTitle?.jsonValue?.value;
  const profesionalTitle = fields?.data?.item?.professionalTitle?.jsonValue?.fields?.Title;
  const hasItems =
    fields?.data?.item?.profileImage?.jsonValue?.value ||
    fields?.data?.item?.alternateTitle?.jsonValue?.value ||
    fields?.data?.item?.title?.jsonValue?.value;
  const showParentDiv = hasItems || isEditing;
  const icons = fields?.data?.icons?.children?.results || [];
  const linkedInUrl = fields?.data?.item?.linkedIn?.jsonValue?.value?.href || '';
  const email = fields?.data?.item?.email?.value as string;
  const phoneNumber = fields?.data?.item?.phone1?.value as string;
  const contactCTA = fields?.data?.item?.contactCTA?.jsonValue?.value ?? {};
  const contextFields = sitecoreContext?.route?.fields as ContextFields;
  const firstName = alternateTitle?.split('-')[0];
  const lastName = alternateTitle?.split('-')[1];

  const profileImageMetadata = contextFields?.profileImage?.value?.asset?.files?.find(
    (item) => item?.name === 'thumbnail'
  );
  const handleEventData = (event: string) => {
    const allOffices = [
      ...offices.map((office) => office.title.value),
      ...(isAdditionalOfficePresent ? [fields?.data?.item?.additionalOffices?.value] : []),
    ];

    const eventData: DataLayerEvent = {
      event,
      profile_name: alternateTitle ?? '',
      profile_title: profesionalTitle?.value?.toString() || '',
      profile_office: allOffices.join(', '),
      profile_services: services.map((service) => service.title.value).join(', '),
      insight_sectors: sectors.map((sector) => sector.title.value).join(', '),
    };

    if (window?.dataLayer) {
      window.dataLayer.push(eventData);
    }
  };

  const exportVcf = () => {
    const professionalTitle = profesionalTitle?.value;
    const firstName = alternateTitle?.split('-')[0];
    const lastName = alternateTitle?.split('-')[1];
    const work = offices.map((office) => office.title.value).join(', ');
    const data: jCard = [
      'vcard',
      [
        ['version', {}, 'text', '4.0'],
        ['fn', {}, 'text', alternateTitle],
        ['n', {}, 'text', [lastName, firstName, '']],
        ['org', {}, 'text', 'Gowling WLG'],
        [
          'adr',
          {
            type: 'work',
            label: work,
          },
          'text',
          ['', '', work],
        ],
        ['title', {}, 'text', professionalTitle],
        ['tel', { type: ['Voice', 'Work'], value: 'uri' }, 'uri', phoneNumber],
        ['email', { type: ['Internet'] }, 'text', email],
        ['url', {}, 'text', 'https://gowlingwlg.com'],
      ],
    ];
    const card = vCard.fromJSON(data);
    const vcf = card.toString();
    const vcardBlob = new Blob([vcf], { type: 'text/vcard' });
    const vcardURL = URL.createObjectURL(vcardBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = vcardURL;
    downloadLink.download = alternateTitle + '.vcf';
    downloadLink.click();
  };

  const handleOnloadLogic = () => {
    handleEventData('people_profile_view');
  };

  const handleOnLoad = () => {
    handleOnloadLogic();
  };
  useEffect(() => {
    handleOnLoad();
  }, []);

  const isOfficesPresent = fields?.data?.item?.offices?.targetItems?.length != 0;
  const isAdditionalOfficePresent = fields?.data?.item?.additionalOffices?.value;
  return (
    <>
      <Head>
        {contextFields?.alternateTitle?.value && (
          <meta name="alternateTitle" content={contextFields?.alternateTitle?.value} />
        )}
        {profileImageMetadata?.url && (
          <meta name="profileImage" content={profileImageMetadata?.url} />
        )}
        {contextFields?.Phone1?.value && (
          <meta name="phoneNumber" content={contextFields?.Phone1?.value} />
        )}
        {contextFields?.Email?.value && <meta name="email" content={contextFields?.Email?.value} />}
        {firstName && <meta name="firstname" content={firstName} />}
        {lastName && <meta name="lastname" content={lastName} />}
        <meta
          name="offices"
          content={contextFields?.Offices?.map((office) => office?.fields?.Title?.value)?.join(',')}
        />
        {contextFields?.ProfessionalTitle?.fields?.Title?.value && (
          <meta
            name="professional_title"
            content={contextFields?.ProfessionalTitle?.fields?.Title?.value}
          />
        )}
      </Head>
      {showParentDiv && (
        <div className="bg-extraLightGrey">
          <div
            className="grid grid-cols-12 md:flex md:justify-between lg:pt-[40px] max-w-[64.5rem] lg:mx-[90px] 2xl:m-auto"
            data-testid="profile-detail"
          >
            <Image
              field={fields?.data?.item?.profileImage?.jsonValue}
              className="object-contain col-span-12 md:col-span-6 px-[68px] lg:px-0 lg:pt-0 pt-[22px] max-h-[664px]"
            />
            <article className="col-span-12 md:col-span-6 bg-white lg:mb-[40px] lg:py-[26px] lg:px-[40px] lg:w-[31.5625rem] w-auto px-[21px] py-[52px] lg:h-auto">
              <Text
                tag="h1"
                className="font-gowlingBliss text-black leading-normal lg:text-[60px] text-[32px] font-bold lg:tracking-[-0.075rem] tracking-[-0.64px] mb-[0.875rem]"
                field={
                  fields?.data?.item?.alternateTitle?.jsonValue.value !== ''
                    ? fields?.data?.item?.alternateTitle?.jsonValue
                    : fields?.data?.item?.title?.jsonValue
                }
              />
              <div className="lg:flex">
                <div className="lg:mr-[8px]">
                  <Text
                    tag="h2"
                    field={profesionalTitle}
                    className="text-[24px] font-arial text-purple lg:flex justify-between leading-normal font-normal mb-[0.625rem]"
                  />
                  <Text
                    tag="p"
                    field={fields?.data?.item?.role}
                    className="text-[16px] font-arial text-purple leading-[156%] lg:mb-[15px] mb-[11.5px]"
                  />
                </div>
                <div className="lg:min-w-[87px]">
                  <ul className="flex md:gap-[0.5rem] gap-[0.875rem] lg:mb-[7.5px] mb-[25px] items-baseline">
                    {icons.map((icon, index) => {
                      if (icon.name === IconType.LinkedIn) {
                        return (
                          <li
                            key={`profile_social_${icon.name}_${index}`}
                            className="group h-[fit-content]"
                          >
                            <a
                              className="h-[1.5625rem] block"
                              title="LinkedIn"
                              href={linkedInUrl} // Set the href directly on the LinkField
                              target="_blank"
                              onClick={() => handleEventData('people_profile_linkedin_click')}
                            >
                              <Image
                                field={icon?.image?.jsonValue}
                                className="hover:filter hover:fill-purple hover:opacity-50  w-[1.438rem] h-[1.5625rem]"
                              />
                            </a>
                          </li>
                        );
                      }
                      return null;
                    })}
                    {icons.map((icon, index) => {
                      if (icon?.name === IconType.Person) {
                        return (
                          <li
                            key={`profile_person_${icon.name}_${index}`}
                            className="group h-[fit-content]"
                          >
                            <button
                              className="block"
                              title="Download VCard"
                              onClick={() => {
                                exportVcf();
                                handleEventData('people_profile_vcard_click');
                              }}
                            >
                              <Image
                                field={icon?.image?.jsonValue}
                                className="hover:filter hover:fill-purple hover:opacity-50 w-[1.5625rem] h-[1.619rem]"
                              />
                            </button>
                          </li>
                        );
                      }
                      return null;
                    })}
                    {icons.map((icon, index) => {
                      if (icon?.name === IconType.Download) {
                        return (
                          <li
                            onClick={() => {
                              handleEventData('people_profile_download_click');
                            }}
                            key={`profile_download_${icon.name}_${index}`}
                            className="group h-[1.625rem]"
                            title="Profile Download"
                          >
                            <DownloadPageAsPdf>
                              <Image
                                field={icon?.image?.jsonValue}
                                className="hover:filter hover:fill-purple hover:opacity-50 cursor-pointer w-[1.75rem] h-[1.625rem]"
                              />
                            </DownloadPageAsPdf>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
              <ul className="text-black flex leading-[156%]">
                {offices.map((office: OfficeType, index: number) => (
                  <li key={office.title.value}>
                    {index !== 0 && ', '}
                    <JssLink
                      field={{ href: office.url.path || '' }}
                      className="hover:text-shadow-black"
                    >
                      {office.title.value}
                    </JssLink>
                  </li>
                ))}
                <li>
                  {isOfficesPresent && isAdditionalOfficePresent ? ', ' : null}
                  {fields?.data?.item?.additionalOffices?.value}
                </li>
              </ul>
              <ul className="text-black leading-[156%] lg:mb-[19.5px] mb-[10px]">
                {admissionDataArray.map(
                  (barAdmissionSelection: BarAdmissionType, index: number) => (
                    <li key={index}>
                      {barAdmissionSelection.admissionType?.value
                        ? `${barAdmissionSelection.admissionType.value}, `
                        : ''}
                      {barAdmissionSelection?.admissionName?.value}
                      {barAdmissionSelection.startYear?.value
                        ? ` - (${barAdmissionSelection.startYear.value})`
                        : ''}
                    </li>
                  )
                )}
              </ul>
              <div className="flex items-center lg:mb-[9.5px] mb-[5px]">
                {email && (
                  <div className="group">
                    {icons.map((icon, index) => {
                      if (icon?.name === IconType.Email) {
                        return (
                          <Image
                            key={index}
                            className="h-[29px] grayscale contrast-150"
                            field={icon?.image?.jsonValue}
                          />
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
                {email && (
                  <Link
                    href={`mailto:${email}`}
                    target="_blank"
                    className="text-[16px] break-all lg:break-keep lg:w-auto w-[275px] font-arial font-bold hover:underline text-black leading-normal lg:ml-[11px] ml-[15px]"
                    onClick={() => handleEventData('people_profile_email_click')}
                  >
                    {email}
                  </Link>
                )}
              </div>

              {(fields?.data?.item?.phone1?.value || isEditing) && (
                <div className="flex items-center lg:mb-0 mb-[5px]">
                  {phoneNumber && (
                    <div className="group">
                      {icons.map((icon, index) => {
                        if (icon?.name === IconType.Phone) {
                          return (
                            <Image
                              key={index}
                              className="h-[29px] grayscale contrast-150"
                              field={icon?.image?.jsonValue}
                            />
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                  {phoneNumber && (
                    <JssLink
                      field={{ href: `tel:${phoneNumber}` }}
                      className="text-[16px] break-all lg:break-keep lg:w-auto w-[275px] font-arial font-bold text-black leading-normal hover:underline ml-[11px]"
                      onClick={() => handleEventData('people_profile_phone_click')}
                    >
                      {phoneNumber}
                    </JssLink>
                  )}
                </div>
              )}
              <JssLink
                field={{
                  href: contactCTA?.href || '#',
                  text: contactCTA?.text || '',
                }}
                onClick={() => handleEventData('people_profile_contact_initiated')}
                className="bg-purple flex items-center justify-center text-white leading-normal hover:bg-aubergine  rounded-[100px] lg:my-[25px] mt-[24px] w-[162px] h-[44px] mb-[32px] text-[14px] font-bold tracking-[0.56px]"
              >
                {contactCTA?.text || ''}
              </JssLink>
              {t('AreasofFocus') && (
                <p className="font-bold text-black lg:mb-[10px] leading-normal mb-[24px]">
                  {t('AreasofFocus')}
                </p>
              )}
              <div className="lg:grid grid-cols-12 flex gap-[24px] lg:gap-[0]">
                <div className="lg:col-span-12 col-span-none">
                  {(fields?.data?.item?.sectors?.targetItems || isEditing) && (
                    <ul className="lg:flex lg:flex-wrap inline-grid gap-[10px] mb-[10px]">
                      {fields?.data?.item?.sectors?.targetItems?.map(
                        (sector: SectorsType, index: number) => (
                          <li
                            key={index}
                            className="h-[38px] bg-extraLightGrey hover:bg-[#CCCBBC] hover:text-aubergine  flex justify-center items-center rounded-[50px]"
                          >
                            <Link
                              href={(sector?.url?.path as string) || '#'}
                              className=" text-[10px] font-arial px-[28px] text-black hover:text-aubergine text-center  leading-[140%]"
                              target="_self"
                            >
                              {sector?.title?.value}
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
                <div className="lg:col-span-12 col-span-none">
                  {(fields?.data?.item?.services?.targetItems || isEditing) && (
                    <ul className="lg:flex lg:flex-wrap inline-grid gap-[10px]">
                      {fields?.data?.item?.services?.targetItems?.map(
                        (service: ServicesType, index: number) => (
                          <li
                            key={index}
                            className="h-[38px] w-fit flex justify-center items-center  bg-extraLightGrey hover:bg-[#CCCBBC] hover:text-aubergine  rounded-[50px] "
                          >
                            <a
                              className="text-[10px] font-arial px-[28px] text-black hover:text-aubergine text-center leading-[140%]"
                              href={(service?.url?.path as string) || '#'}
                            >
                              {service.title?.value}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetail;
