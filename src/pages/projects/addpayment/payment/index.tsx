import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import styles from "../../../../../public/styles/Home.module.css";

const affAddUserReject: React.FC<{}> = ({}) => {
  return (
    <Layout>
      <div className="container">
        <div id="projetContainer" className="card mt-5">
          <div className="row">
            <div className="col text-warning" id="WarningText">
              <h1>Payment succeed </h1>
              <Link href="/">
                <button type="button" className="btn btn-success">
                  Continue
                </button>
              </Link>
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
