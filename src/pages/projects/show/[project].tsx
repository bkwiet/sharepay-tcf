import { GetServerSideProps } from "next";
import React from "react";
import { findProjectById } from "../../../utils/projects";
import { Projects } from "../../../types/projects";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDonate } from "@fortawesome/free-solid-svg-icons";


const affOneProject: React.FC<{ project: Projects }> = ({ project }) => {
  console.log("arrivee typeof datas", typeof project);
  console.log(project);

  // calcul du solde a payer sur le projet
  let allpayment:number = 0;
  project.payments.map((paiement)=>{
    allpayment = allpayment + Number(paiement.amount);
  })
  const solde = project.amount - allpayment;
  // fin de calcul du solde

  return (
    <Layout>
      <div className="container">

        <div className="mt-1">
          <div className="row">
            <h1 className="col text-center">{project.name}</h1>
          </div>

          <div className="row text-dark">
            <h6>Summary</h6>
          </div>
          <div className="row">
              <p className="col">{project.summary}</p>   
          </div>

          <div className="row text-dark">
            <h6>Budget</h6>
          </div>
          <div className="row">
              <p className="col">{"Inital : " +project.amount + "€ - " + "All Payment : "+ allpayment+ " € - SOLD TO PAY : " + solde + " €"}</p>   
          </div>


          <div className="row text-dark">
            <h6>User(s)</h6>
          </div> 
          <div>
            {project.users.map((user) => {
                return (
                  <div className="row">
                    <p className="col">{user.firstname + " " +user.lastname}</p>
                  </div>
                );
              })}
          </div>
          

          <div className="row text-dark">
            <h6>Payment(s)</h6>
          </div>
          <div>
            {project.payments.map((payment) => {
              return (
                
                <div>
                  <div className="row">
                    <p className="col-3">{payment.date_payment}</p>
                    <p className="col-3">{payment.amount} €</p>
                    {/* <p className="col-3">{"by "+ payment.user_idkey}</p> */}
                  </div>
                  <div className="row">
                    <p className="col">{payment.summary}</p>
                  </div>
                </div>
                
              );
            })}
          </div>

        </div>
          <div className="payment">
            <a id="payment" href="#">
              <span>
                <div>
                  <span>
                    <FontAwesomeIcon icon={faDonate} id="iconDonate" />
                  </span>
                </div>
                Add a Payment!
              </span>
            </a>
          </div>
      </div>
    </Layout>
  );
};
export default affOneProject;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const idkey = context.params?.project;
  console.log("valeur de params = ", idkey);

  const project = await findProjectById(Number(idkey));
  console.log(project);
  if (project) {
    const data = {
      idkey: project.idkey,
      name: project.name,
      summary: project.summary,
      date_opened: project.date_opened,
      date_ended: project.date_ended,
      amount: project.amount,
      admin_idkey: project.admin_idkey,
      actif: project.actif,
      users: project.users,
      payments: project.payments,
    };
    return {
      props: {
        project: data,
      },
    };
  } else {
    return {
      props: {
        project: {},
      },
    };
  }
};
