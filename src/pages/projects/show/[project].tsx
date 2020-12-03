import { GetServerSideProps } from "next";
import React from "react";
import Head from "next/head";
import { findProjectById } from "../../../utils/projects";
import { Projects } from "../../../types/projects";
import Layout from "../../../components/layout";
import Sharepay from "../../../components/sharepay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";
import { Container, Table } from "react-bootstrap";
import { formatAmountForDisplay, CURRENCY } from "../../../utils/stripe";

const affOneProject: React.FC<{ project: Projects }> = ({ project }) => {
  console.log("arrivee typeof datas", typeof project);
  console.log(project);

  // calcul du solde a payer sur le projet
  let allpayment: number = 0;
  project.payments.map((paiement) => {
    allpayment = allpayment + Number(paiement.amount);
  });
  const solde = project.amount - allpayment;
  // fin de calcul du solde

  return (
    <Layout>
      <Head>
        <title>Tout Compte Fait - Manage : {project.name}</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_manage.jpg") !important;
          }
        `}</style>
      </Head>
      <Container className={"dontTouchPoka "}>
        <div className={"dontTouchJhon"}>
          <h1 className="">{project.name}</h1>
          <div className="">
            <div className="row text-dark">
              <h5>⦿ Summary</h5>
            </div>
            <div className="row">
              <p className="col">
                <span className="infoxmation">{project.summary}</span>
              </p>
            </div>

            <div className="row text-dark">
              <h5>⦿ Participant(s)</h5>
            </div>
            <div>
              {project.users.map((user, id) => {
                return (
                  <div className="row" key={user.user_idkey + id}>
                    <p className="col">
                      <span className="infoxmation">{user.firstname + " " + user.lastname}</span>
                    </p>
                  </div>
                );
              })}
            </div>
            <hr className={"separ"} />
            <div className="row text-dark">
              <h5>⦿ Budget</h5>
            </div>
            <div className="">
              <p>
                Initial : <span className="infoxmation">{formatAmountForDisplay(project.amount, CURRENCY)}</span>{" "}
              </p>
              <p>
                Total payment : <span className="infoxmation">{formatAmountForDisplay(allpayment, CURRENCY)}</span>{" "}
              </p>
            </div>

            <Sharepay project={project} />

            <hr className={"separ"} />

            <div className="row text-dark">
              <h5>⦿ Payment history</h5>
            </div>
            <div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Participant</th>
                    <th>Transaction date</th>
                    <th>Amount</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {project.payments.map((payment, id) => {
                    // recherche du nom/prenom de la personne qui a fait le réglement
                    let firstname = "";
                    let lastname = "";
                    project.users.map((user) => {
                      if (user.user_idkey === payment.user_idkey) {
                        firstname = user.firstname;
                        lastname = user.lastname;
                      }
                    }); // fin recherche nom prenom
                    return (
                      <tr key={id + payment.user_idkey}>
                        <td>{id}</td>
                        <td>{firstname}</td>
                        <td>{payment.date_payment}</td>
                        <td>{formatAmountForDisplay(payment.amount, CURRENCY)}</td>
                        <td>{payment.summary}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>

            <hr className={"separ"} />

            {project.actif === true ? (
              <div className="payment">
                <a
                  id="payment"
                  href={
                    "/projects/addpayment?project_idkey=" +
                    project.idkey +
                    "&project_name=" +
                    project.name +
                    "&project_amount=" +
                    project.amount +
                    "&project_solde=" +
                    solde
                  }
                >
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
            ) : null}
          </div>
        </div>
      </Container>
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
