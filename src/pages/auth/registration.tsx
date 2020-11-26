import React from "react";
import { providers, signIn } from "next-auth/client";
import Layout from "../../components/layout";
import Head from "next/head";
import { Button } from "react-bootstrap";
import styles from "../../../public/styles/Signin.module.css";

export default function Registration({ providers }) {
  let icon;
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Registration</title>
      </Head>
      <Layout></Layout>
    </>
  );
}
