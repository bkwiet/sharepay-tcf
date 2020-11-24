import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { SWRConfig } from "swr";
import "bootstrap/dist/css/bootstrap.min.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { session } = pageProps;
  return (
    <Provider options={{ site: process.env.SITE }} session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
