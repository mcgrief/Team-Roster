/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Head from 'next/head';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="title, meta, nextjs" />
        <meta name="author" content="Adam Steel" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title />
      </Head>
      <AuthProvider>
        <ViewDirectorBasedOnUserAuthStatus component={Component} pageProps={pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
