import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import styles from "../../../../public/styles/Home.module.css";
import Head from "next/head";

const affAddUserReject: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <>
        <Head>
          <title>Tout Compte Fait - We have encoutered some issues</title>
          <style>{`
          html,
          body {
            background-image: url("/pictures/background_error.png") !important;
          }
        `}</style>
        </Head>

        <Container>
          <div className={"dontTouchJhon"}>
            <h1>
              <span className={styles.chup}>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </span>
              Erreur lors de l'ajout d'un utilisateur au projet
            </h1>

            <div className="row">
              <div className="col mt-3">
                <p>Soit l'email est identique à celui de l'administrateur.</p>
                <p>Soit l'email du nouvel utilisateur n'existe pas dans notre base de donnée.</p>
                <p>Soit l'utilisateur que vous essayez d'integrer existe déjà dans votre projet.</p>
                <p>Soit une erreur technique est survenue</p>
              </div>
            </div>
          </div>
        </Container>
      </>
    </Layout>
  );
};
export default affAddUserReject;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
