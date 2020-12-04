import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import Layout from "../../../../components/layout";
import Head from "next/head";

const affAddUserReject: React.FC<{}> = ({}) => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Payment success</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_paiement.jpg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <div className="container">
          <div id="projetContainer" className="card mt-5">
            <div className="row">
              <div className="col text-warning" id="WarningText">
                <h1>Payment success</h1>
                <Link href="/projects">
                  <button type="button" className="btn btn-success">
                    Continue to your Project list
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default affAddUserReject;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
