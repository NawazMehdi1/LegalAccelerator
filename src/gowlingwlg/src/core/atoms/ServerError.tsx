import Head from 'next/head';
import { ReactElement } from 'react';

const ServerError = (): ReactElement => (
  <>
    <Head>
      <title>500: Server Error</title>
    </Head>
    <div style={{ padding: 10 }}>
      <h1>500 Internal Server Error</h1>
      <p>There is a problem with the resource you are looking for, and it cannot be displayed.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

export default ServerError;
