import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../../components/layout";

const affAddUserReject: React.FC<{ }> = ({ }) => {

  return (
    <Layout>
      <div className="container">
        <div id="projetContainer" className="card mt-5">
          <div className="row">
            <div className="col text-warning">
              Ajout d'un USER à un projet
            </div>
          </div>

          <div className="row">
            <div className="col">
              <p>Soit l'email est identique à celui de l'administrateur</p>
              <p>Soit l'email du nouveau user n'est pas trouvé dans le db</p>
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
      props: {
        
      },
    };
};