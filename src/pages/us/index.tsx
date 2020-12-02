import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../public/styles/CreateProject.module.css";

const Registration: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - `Bout Us</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_adduser.jpg") !important;
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
