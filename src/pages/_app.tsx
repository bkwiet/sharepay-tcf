import type { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { session } = pageProps;
  return (
    <Provider session={session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
