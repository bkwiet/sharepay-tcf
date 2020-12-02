import React from "react";
import { providers, signIn } from "next-auth/client";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../../components/layout";
import Head from "next/head";
import { Button } from "react-bootstrap";
import styles from "../../../public/styles/Signin.module.css";

const SignIn: NextPage = ({ providers }) => {
  const [email, setEmail] = React.useState("");

  return (
    <>
      <Head>
        <title>Tout Compte Fait - Sign in</title>
      </Head>
      <Layout>
        <div className={"d-flex " + styles.login}>
          <h1>Let's begin your journey !</h1>
          <img className={styles.logo} src="/pictures/brand_logo_mod.jpg" alt="brand_logo" />
          <div className={""}>
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
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
