import React from "react";
import { providers, signIn } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import { Button } from "react-bootstrap";
import styles from "../../../public/styles/Signin.module.css";

export default function SignIn({ providers }) {
  let icon;
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Homepage</title>
      </Head>
      <Layout>
        <div className={"d-flex " + styles.login}>
          <img className={styles.logo} src="/pictures/brand_logo.jpg" alt="brand_logo" />
          <h1>Sign in to start your journey</h1>
          <div className={""}>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <Button className={"mt-3"} onClick={() => signIn(provider.id)}>
                  {provider.id === "connect" ? <img src="/pictures/icons/fewlines.ico" alt="connect_logo" /> : null}
                  {provider.id === "google" ? <img src="/pictures/icons/google.png" alt="connect_logo" /> : null}
                  {provider.id === "github" ? <img src="/pictures/icons/github.png" alt="connect_logo" /> : null}
                  {/* {provider.id === "email" ? <img src="/pictures/icons/mail.png" alt="connect_logo" /> : null} */}
                  Sign in with {provider.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const list_providers = await providers(context);
//   return {
//     providers: list_providers,
//   };
// };
SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  };
};
