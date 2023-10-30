import { SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { ReactElement } from 'react';
import { SitecorePageProps } from 'lib/page-props';
import { componentBuilder } from 'temp/componentBuilder';
import Layout from 'core/templates/Layout';

export { getStaticProps } from 'data/error';

type ErrorPageProps = SitecorePageProps & {
  children: ReactElement;
};

const ErrorPage = (props: ErrorPageProps): ReactElement => {
  if (!props?.layoutData) {
    return props.children;
  }

  return (
    <SitecoreContext
      componentFactory={componentBuilder.getComponentFactory()}
      layoutData={props.layoutData}
    >
      <Layout layoutData={props.layoutData} headLinks={props.headLinks} />
    </SitecoreContext>
  );
};

export default ErrorPage;
