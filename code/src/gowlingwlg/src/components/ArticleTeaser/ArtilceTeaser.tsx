import { Text, Field, withDatasourceCheck, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type ArtilceTeaserProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
  };
};

const ArtilceTeaser = (props: ArtilceTeaserProps): JSX.Element => (
  <div>
    <p>ArtilceTeaser Component</p>
    <Text field={props?.fields?.title} />
    <RichText field={props?.fields?.description} />
  </div>
);

export default withDatasourceCheck()<ArtilceTeaserProps>(ArtilceTeaser);
