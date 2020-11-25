import React from "react";
import Head from "next/head";
import Header from "./header";
import styles from "../../public/styles/Layout.module.css";
import { useSession } from "next-auth/client";

// type Props = {
//   setPage: React.Dispatch<React.SetStateAction<string>>;
//   isLoggedIn: boolean;
//   spotifyLoginUrl: string;
// };

export const Layout: React.FC = ({ children }) => {
  // const { data } = useSWR("/api/get-cookies");
  // const accessToken = data;
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/95a069202e.js" crossOrigin="anonymous"></script>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="bkwiet corp icon" href="/pictures/wallet.ico" type="image/x-icon" />
      </Head>

      <Header session={session} loading={loading} />

      <main className={" " + styles.main}>{children}</main>
    </>
  );
};

export default Layout;
