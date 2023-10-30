import type { AppProps } from 'next/app';
import { useState } from 'react';
import { I18nProvider } from 'next-localization';
import { SitecorePageProps } from 'lib/page-props';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import localFont from 'next/font/local';
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const gowlingBliss = localFont({
  src: '../fonts/gowling/GWLGBliss-Regular.otf',
  variable: '--gowlingBliss',
});

const eloquentjf = localFont({
  src: '../fonts/eloquentjf/EloquentJFRegularPro.ttf',
  variable: '--eloquentjf',
});

function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
  const [queryClient] = useState(() => new QueryClient());
  const { dictionary, ...rest } = pageProps;

  return (
    // Use the next-localization (w/ rosetta) library to provide our translation dictionary to the app.
    // Note Next.js does not (currently) provide anything for translation, only i18n routing.
    // If your app is not multilingual, next-localization and references to it can be removed.
    <div className={` ${eloquentjf.variable} ${gowlingBliss.variable}`}>
      <QueryClientProvider client={queryClient}>
        <div className="print:hidden">
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
        <Hydrate state={pageProps.dehydratedState}>
          <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
            <Component {...rest} />
          </I18nProvider>
        </Hydrate>
      </QueryClientProvider>
    </div>
  );
}

export default App;
