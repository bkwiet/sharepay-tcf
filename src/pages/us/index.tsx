import React from "react";
import Layout from "../../components/layout";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "react-bootstrap";

const Registration: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - `Bout Us</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_about.jpg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka "}>
          <h1>`Bout Us</h1>
        </Container>
      </Layout>
    </>
  );
};

export default Registration;
