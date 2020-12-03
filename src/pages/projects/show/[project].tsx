import { GetServerSideProps } from "next";
import React from "react";
import { findProjectById } from "../../../utils/projects";
import { Projects } from "../../../types/projects";
import Layout from "../../../components/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";



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
                  <div className="row" key={user.user_idkey}>
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
              // recherche du nom/prenom de la personne qui a fait le réglement
              let firstname="";
              let lastname="";
                project.users.map((user)=> {
                  if (user.user_idkey === payment.user_idkey) {
                    firstname = user.firstname;
                    lastname = user.lastname;
                  }
                }) // fin recherche nom prenom
              return (
                <div>
                  <div className="row">
                    <p className="col-3">{payment.date_payment}</p>
                    <p className="col-3">{payment.amount} €</p>
                    <p className="col-3">{"by "+ firstname + " " + lastname}</p>
                  </div>
                  <div className="row">
                    <p className="col">{payment.summary}</p>
                  </div>
                </div>
                
              );
            })}
          </div>

          { project.actif === true
           ? <div className="payment">
              <a id="payment" 
                href={
                  "/projects/addpayment?project_idkey=" +
                  project.idkey +
                  "&project_name=" +
                  project.name +
                  "&project_amount=" +
                  project.amount +
                  "&project_solde=" +
                  solde
                }>
                <span>
                  <div>
                    <span>
                    <FontAwesomeIcon icon={faPiggyBank} id="iconDonate" />
                    </span>
                  </div>
                  Add a Payment!
                </span>
              </a>
            </div>
            : null  
          }

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
