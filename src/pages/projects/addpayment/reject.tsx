import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../public/styles/Home.module.css";

const affAddUserReject: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <div className="container">
        <div id="projetContainer" className="card mt-5">
          <div className="row">
            <span className={styles.spinout}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
            <div className="col text-warning" id="WarningText">
              Erreur lors de votre paiement
            </div>
            <span className={styles.spinout}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          </div>

          <div className="row" id="warningTextbis">
            <div className="col">
              <p>Une erreur technique est survenue</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default affAddUserReject;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
