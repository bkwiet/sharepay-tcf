import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { findUserByEmail } from "../../utils/users";
import { findProjectById } from "../../utils/projects";
import { Projects } from "../../types/projects";
import Head from "next/head";
import Layout from "../../components/layout";
import { Container, Card } from "react-bootstrap";
import styles from "../../../public/styles/Projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatAmountForDisplay, CURRENCY } from "../../utils/stripe";
import { faCogs, faUserPlus, faPiggyBank, faExclamation } from "@fortawesome/free-solid-svg-icons";

const ProjectIndex: React.FC<{ projects: Projects[]; my_user_idkey: number }> = ({ projects, my_user_idkey }) => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - My Projects</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_project.jpeg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka " + styles.couan}>
          <h1>My projects</h1>
          <div className={styles.timeline}>
            {projects.map((project) => {
              // calcul du solde a payer sur le projet
              let allpayment: number = 0;
              project.payments.map((paiement) => {
                allpayment = allpayment + Number(paiement.amount);
              });
              const solde = project.amount - allpayment;
              // fin de calcul du solde

              return (
                <Card className={"mb-4 " + styles.card} key={project.idkey}>
                  <Card.Body className={styles.body}>
                    <Card.Title className={styles.title}>{project.name}</Card.Title>

                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>
                      {"Creation date : " + project.date_opened}
                    </Card.Subtitle>

                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>
                      Participants :{" "}
                      {project.users.map((user, id) => {
                        if (project.users.length - 1 === id) return <span className={styles.particpant}>{user.firstname}</span>;
                        else return <span className={styles.particpant}>{user.firstname + ", "}</span>;
                      })}
                    </Card.Subtitle>

                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>
                      Budget : {formatAmountForDisplay(project.amount, CURRENCY)}
                    </Card.Subtitle>

                    <hr className={styles.separator} />

                    <Card.Subtitle className={"mb-2 text-muted " + styles.muted}>Summary</Card.Subtitle>

                    <Card.Text>{project.summary}</Card.Text>

                    <hr className={styles.separator} />
                    <Card.Link href={"/projects/show/" + project.idkey}>
                      <FontAwesomeIcon icon={faCogs} /> Detail Project
                    </Card.Link>

                    {project.admin_idkey === my_user_idkey ? (
                      <Card.Link href={"/projects/adduser?project_idkey=" + project.idkey + "&project_name=" + project.name}>
                        <FontAwesomeIcon icon={faUserPlus} id="iconAddUser" /> Add Participant
                      </Card.Link>
                    ) : null}

                    {project.actif === true ? (
                      <Card.Link
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
                        <FontAwesomeIcon icon={faPiggyBank} id="iconAddPayment" /> Add Payment
                      </Card.Link>
                    ) : (
                      <Card.Link href={"#"}>
                        <FontAwesomeIcon icon={faExclamation} id="iconWarning" /> Project Closed since {project.date_ended}
                      </Card.Link>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default ProjectIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // dans le contexte on recupere email dans le query
  const session = await getSession(context);
  let my_user_idkey = 0;

  if (session) {
    const _projects = await findUserByEmail(String(session.user.email)).then((user) => {
      my_user_idkey = user.user_idkey;
      return async () => Promise.all(user.projects.map(async (project) => await findProjectById(project.idkey)));
    });

    const swap = await _projects();
    const projects = JSON.parse(JSON.stringify(swap));

    return {
      props: { projects, my_user_idkey },
    };
    // Pass data to the page via props
  } else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }
};
