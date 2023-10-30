import config from 'temp/config';
import {
  GraphQLErrorPagesService,
  SitecoreContext,
  ErrorPages,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { SitecorePageProps } from 'lib/page-props';
import { componentBuilder } from 'temp/componentBuilder';
import { GetStaticProps } from 'next';
import { siteResolver } from 'lib/site-resolver';
import Layout from 'core/templates/Layout';
import NotFound from 'core/templates/NotFound';

const Custom404 = (props: SitecorePageProps) => {
  console.log('PROPS', props);
  console.log('LAYOUT DATA', props.layoutData);
  console.log('LF FIELDS', props.layoutData?.sitecore?.route?.fields);

  if (!props?.layoutData) {
    return <NotFound />;
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

export const getStaticProps: GetStaticProps = async (context) => {
  const site = siteResolver.getByName(config.jssAppName);
  const errorPagesService = new GraphQLErrorPagesService({
    endpoint: config.graphQLEndpoint,
    apiKey: config.sitecoreApiKey,
    siteName: site.name,
    language: context.locale ?? config.defaultLanguage,
  });
  let resultErrorPages: ErrorPages | null = null;

  try {
    resultErrorPages = await errorPagesService.fetchErrorPages();
  } catch (error) {
    console.log('Error occurred while fetching error pages');
    console.log(error);
  }

  return {
    props: {
      headLinks: [],
      layoutData: resultErrorPages?.notFoundPage?.rendered ?? null,
    },
  };
};

export default Custom404;
