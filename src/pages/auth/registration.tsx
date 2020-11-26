import React from "react";
import { getSession } from "next-auth/client";
import Layout from "../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button } from "react-bootstrap";
import styles from "../../../public/styles/Registration.module.css";

const Registration: NextPage = ({ session }) => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Registration</title>
      </Head>
      <Layout>{session && <h1>Hello {session.user.email}</h1>}</Layout>
    </>
  );
};

export default Registration;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
