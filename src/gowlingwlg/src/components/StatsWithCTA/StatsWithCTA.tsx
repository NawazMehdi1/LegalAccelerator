import {
  Text,
  Field,
  withDatasourceCheck,
  RichText as JssRichText,
  LinkField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import cn from 'classnames';

type StatsType = {
  fields: { Description: Field<string>; Title: Field<string>; CTALink: LinkField };
  id: string;
};

type StatsWithCtaProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    SelectColumns: Array<StatsType>;
    CTALink: {
      value: LinkField;
    };
  };
};

const StatsWithCTA = ({ fields }: StatsWithCtaProps): JSX.Element => {
  if (fields && fields?.SelectColumns?.length > 0) {
    const shouldIncreaseFontSize = fields.SelectColumns.some((stats: StatsType) => {
      const title = stats?.fields?.Title?.value;
      const isNumericTitle = /^\d+(\+)?$/.test(title);
      return isNumericTitle && title.length > 3;
    });

    const shouldIncreaseNonNumericFontSize = fields.SelectColumns.some((stats: StatsType) => {
      const title = stats?.fields?.Title?.value;
      const isNumericTitle = /^\d+(\+)?$/.test(title);
      const titleLength = title.length;
      return !isNumericTitle && titleLength > 3;
    });

    return (
      <section className="bg-aubergine" style={{ backgroundColor: '#39224E' }}>
        <div className="max-w-[1200px] 2xl:max-w-[1440px] m-auto flex w-full px-[20px] md:px-[75px] flex-wrap justify-around pt-[48px] md:py-[40px]">
          {fields.SelectColumns.map((stats: StatsType) => {
            const title = stats?.fields?.Title?.value;
            const isNumericTitle = /^\d+(\+)?$/.test(title);

            const hasTitle = stats?.fields?.Title?.value;
            const hasDescription = stats?.fields?.Description?.value;

            if (!hasTitle && !hasDescription) {
              return null;
            }
            const slicedTitle = isNumericTitle ? title.slice(0, 5) : title;

            return (
              <div
                key={stats?.id}
                className={cn({
                  'w-full md:w-1/2 lg:w-1/4': hasTitle && hasDescription,
                  'flex flex-col': true,
                })}
              >
                <div
                  className={cn(
                    'mb-[10px] font-eloquentjf text-center leading-normal tracking-[-1.6px]',
                    {
                      'text-[50px] md:text-[80px] md:tracking-[-2.2px]':
                        shouldIncreaseFontSize && isNumericTitle,
                    },
                    {
                      'text-[80px] md:text-[110px] md:tracking-[-2.2px]':
                        !shouldIncreaseFontSize && isNumericTitle,
                    },
                    {
                      'text-[39px] tracking-[-0.78px]':
                        !isNumericTitle && shouldIncreaseNonNumericFontSize,
                    },
                    {
                      'text-[80px] md:text-[110px] md:tracking-[-2.2px]':
                        !isNumericTitle && !shouldIncreaseNonNumericFontSize,
                    }
                  )}
                  style={{ color: '#fff' }}
                >
                  <Text
                    field={{
                      ...stats?.fields?.Title,
                      value: slicedTitle,
                    }}
                  />
                </div>
                {hasDescription && (
                  <div className="md:mb-[30px] mb-[20px]">
                    <JssRichText
                      field={stats?.fields?.Description}
                      className="md:w-[177px] w-auto m-auto text-center text-[16px] font-normal font-arial leading-[156%]"
                      style={{ color: '#D7B7D7' }}
                    />
                  </div>
                )}
                <div className="mt-auto md:mb-0 mb-[57px]">
                  <JssLink
                    field={stats?.fields?.CTALink?.value}
                    target="_self"
                    className={
                      stats?.fields?.CTALink?.value?.href
                        ? `font-arial flex items-center h-[49px] justify-center bg-mainPurple rounded-[100px] text-white leading-normal text-[16px] font-bold`
                        : ''
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  return <></>;
};

export default withDatasourceCheck()<StatsWithCtaProps>(StatsWithCTA);
