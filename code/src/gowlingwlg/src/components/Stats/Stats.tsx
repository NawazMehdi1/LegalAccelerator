import {
  Text,
  Field,
  withDatasourceCheck,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import cn from 'classnames';

type StatsType = {
  fields: { Description: Field<string>; Title: Field<string> };
  id: string;
};

type StatsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Description: Field<string>;
    SelectedStats: Array<StatsType>;
  };
};

const Stats = ({ fields }: StatsProps): JSX.Element => {
  if (fields && fields?.SelectedStats?.length > 0) {
    let hasLongTitle = false;

    fields.SelectedStats.forEach((stats: StatsType) => {
      const title = stats?.fields?.Title?.value;
      if (title && title.length > 3) {
        hasLongTitle = true;
      }
    });

    const fontSizeClass = hasLongTitle
      ? 'text-[50px] md:text-[80px]'
      : 'text-[80px] md:text-[110px]';

    return (
      <div className="bg-aubergine" style={{ backgroundColor: '#39224E' }}>
        <div className="max-w-[1200px] 2xl:max-w-[1440px] m-auto flex w-full px-[20px] md:px-[75px] flex-wrap justify-around pt-[50px] pb-[20px] md:py-[50px]">
          {fields.SelectedStats.map((stats: StatsType) => {
            const hasTitle = stats?.fields?.Title?.value;
            const hasDescription = stats?.fields?.Description?.value;

            if (!hasTitle && !hasDescription) {
              return null;
            }

            return (
              <article
                key={stats?.id}
                className={cn({
                  'w-1/2 md:w-1/2 lg:w-1/4': hasTitle && hasDescription,
                })}
              >
                <Text
                  tag="h2"
                  className={`mb-[20px] font-eloquentjf text-center leading-normal md:tracking-[-2.2px] tracking-[-1.6px] font-normal text-white ${fontSizeClass}`}
                  field={{
                    ...stats?.fields?.Title,
                    value: stats?.fields?.Title?.value.slice(0, 5),
                  }}
                />
                <JssRichText
                  field={stats?.fields?.Description}
                  className="mb-[30px] w-[177px] m-auto text-center text-[16px] font-normal font-arial leading-[156%] tracking-[-0.15px]"
                  style={{ color: '#D7B7D7' }}
                />
              </article>
            );
          })}
        </div>
      </div>
    );
  }
  return <></>;
};

export default withDatasourceCheck()<StatsProps>(Stats);
