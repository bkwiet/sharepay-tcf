import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../public/styles/Home.module.css";
import Link from "next/link";

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
              Erreur lors de l'ajout d'un utilisateur au projet
            </div>
            <span className={styles.spinout}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>
          </div>

          <div className="row" id="warningTextbis">
            <div className="col">
              <p>Soit l'email est identique à celui de l'administrateur.</p>
              <p>
                Soit l'email du nouvel utilisateur n'existe pas dans notre base
                de donnée.
              </p>
              <p>
                Soit l'utilisateur que vous essayez d'integrer existe déjà dans
                votre projet.
              </p>
              <p>
                Pour réessayer,
                <Link href={"/projects/adduser"}> click ICI</Link>
              </p>
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
