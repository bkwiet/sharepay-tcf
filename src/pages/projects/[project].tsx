import { GetServerSideProps } from 'next';
import React from "react";
import { findProjectById } from "../../utils/projects";
import { Projects} from "../../types/projects.d"
import Layout from "../../components/layout";

const affOneProject: React.FC<{project:Projects}> = ({ project }) => {
  console.log("arrivee typeof datas", typeof project);
  console.log(project);

  return (
    <Layout>
      <div className="container">
        <div className="card mt-5 bg-light">

            <div className="row">
              <div className="col">
                
                <h1 className="col text-center">{project.name}</h1>
                <p className="col p-3 text-justify">{project.summary}</p>
              </div>
            </div>

            <div className="row">
              <h3 className="col p-3 text-justify">Participants</h3>
              {project.user_projects.map((user) => {
                return (
                  <div className="col">
                        <p>{user.user_idkey}</p>
                        <p>{user.firstname}</p>
                        <p>{user.lastname}</p>
                  </div>
                )
              })}
            </div>

            <div className="row">
              <h3 className="col p-3 text-justify">Paiements</h3>
              {project.payments.map((payment) => {
                return (
                  <div className="col">
                        <p>{payment.user_idkey}</p>
                        <p>{payment.summary}</p>
                        <p>{payment.date_payment}</p>
                        <p>{payment.amount}</p>
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </Layout>
  )
}
export default affOneProject;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const idkey = context.params?.project;
  console.log("valeur de params = ",idkey);

  const project = await findProjectById(idkey);
  console.log(project);
  
  const data = {
    idkey:project.idkey,
    name: project.name,
    summary: project.summary,
    date_opened: project.date_opened,
    date_ended: project.date_ended,
    amount: project.amount,
    admin_idkey: project.admin_idkey,
    actif: project.actif,
    user_projects: project.user_projects,
    payments: project.payments,
  };

  return { 
    props: { 
      project: data
    }
  };
}
