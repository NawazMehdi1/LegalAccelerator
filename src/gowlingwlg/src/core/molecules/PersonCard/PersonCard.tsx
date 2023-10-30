import { Text, useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { AuthorCardsProps, OfficeType } from '../../atoms/Authors/types';
import Link from 'next/link';
import Image from 'core/atoms/Image';

interface PersonCardProps extends AuthorCardsProps {
  styleClassName: string;
}

interface DataLayerEvent {
  event: string;
  author_name?: string | number | undefined;
  author_designation?: string;
  author_location?: string;
}

const PersonCard = (props: PersonCardProps): JSX.Element => {
  const { url, profileImage, alternateTitle, professionalTitle, role, offices, styleClassName } =
    props;
  const handleAuthorClick = (name: string | number | undefined, title: string) => {
    const eventData: DataLayerEvent = {
      event: 'author_click',
      author_name: name,
      author_designation: title,
      author_location: offices?.targetItems.map((office) => office.title.value).join(','),
    };
    window.dataLayer.push(eventData);
  };
  const { sitecoreContext } = useSitecoreContext();
  const isEditing = sitecoreContext && sitecoreContext?.pageState !== 'normal';
  const hasValues =
    profileImage?.jsonValue?.value?.src ||
    alternateTitle.jsonValue?.value ||
    professionalTitle?.targetItem?.title.jsonValue?.value ||
    role.value ||
    offices?.targetItems.length ||
    isEditing;
  if (!hasValues) {
    return <></>;
  }
  return (
    <Link
      href={url?.path || '#'}
      className={`bg-extraLightGrey w-full border-x-[22px] md:border-0 border-white border-solid md:mb-0 ${styleClassName} flex flex-col hover:shadow-custom text-black md:h-auto h-full`}
      onClick={() =>
        handleAuthorClick(
          alternateTitle?.jsonValue?.value,
          professionalTitle?.targetItem?.title?.value
        )
      }
      data-testid="person-card"
    >
      <div className="h-[195px] justify-center border-b-[3px] border-b-darkGrey">
        {profileImage?.jsonValue?.value?.src && (
          <Image
            className="w-[100%] h-[100%] object-top object-contain"
            field={profileImage?.jsonValue}
            editable={false}
          />
        )}
      </div>
      <div className="pt-[25px] pb-[32px] pl-[20px] pr-[34px]">
        <p className="font-bold text-2xl leading-[normal]">{alternateTitle?.jsonValue?.value}</p>
        <Text
          tag="p"
          field={professionalTitle?.targetItem?.title}
          className="text-base leading-[156%]"
        />
        <Text tag="p" field={role} className="text-base leading-[156%]" />
        {offices?.targetItems.map((office: OfficeType, index: number) => {
          const isLastItem = index === offices.targetItems.length - 1;
          return (
            <span key={`office-${index}`} className="text-base text-mainPurple leading-[156%]">
              {office?.title.value}
              {isLastItem ? null : ','}
            </span>
          );
        })}
      </div>
    </Link>
  );
};

export default PersonCard;
