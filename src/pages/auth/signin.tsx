import React from "react";
import { providers, signIn } from "next-auth/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import { Button, Container } from "react-bootstrap";
import styles from "../../../public/styles/Signin.module.css";

type Connect = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

interface _Providers {
  [key: string]: Connect;
}
type Props = {
  providers: _Providers;
};

const SignIn: NextPage<Props> = ({ providers }) => {
  console.log("proviser", providers);

  return (
    <>
      <Head>
        <title>Tout Compte Fait - Sign in</title>
        <style>{`
              html,
              body {
                background-image: url("/pictures/background_signin.jpg") !important;
              }
              #peer nav { background-color: rgb(0 0 0 / 78%);}
              #peer a {
                color: white !important;
            }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka"}>
          <div className={"" + styles.login}>
            <h1>Let's begin your journey !</h1>
            {/* <img className={styles.logo} src="/pictures/brand_logo.jpg" alt="brand_logo" /> */}
            <div className="mt-3">
              {Object.values(providers).map((provider) => (
                <div className={styles.providers} key={provider.name}>
                  <Button className={"mt-3"} onClick={() => signIn(provider.id)}>
                    {provider.id === "connect" ? <img src="/pictures/icons/fewlines.ico" alt="connect_logo" /> : null}
                    {provider.id === "google" ? <img src="/pictures/icons/google.png" alt="connect_logo" /> : null}
                    {provider.id === "github" ? <img src="/pictures/icons/github.png" alt="connect_logo" /> : null}
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const list_providers = await providers();
  return {
    props: {
      providers: list_providers,
    },
  };
};
