import React from "react";
import Head from "next/head";
import Header from "./header";
import styles from "../../styles/Layout.module.css";
import NavProjectBar from "../components/NavProjectBar";
type Props = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean;
  spotifyLoginUrl: string;
};

export const Layout: React.FC<Props> = ({ children, isLoggedIn }) => {
  // const { data } = useSWR("/api/get-cookies");
  // const accessToken = data;

  return (
    <>
      <Head>
        <title>Tout Compte Fait</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="bkwiet corp icon" href="wallet.ico" type="image/x-icon" />
        <script
          src="https://kit.fontawesome.com/95a069202e.js"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <Header />
      <div className="MainContenairCss">
        <NavProjectBar></NavProjectBar>
      </div>
      <div className={""}>
        <main className={""}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
