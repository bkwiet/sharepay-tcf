import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { findUserByEmail } from "../../../utils/users";
import { findProjectById } from "../../../utils/projects";
import { Projects } from "../../../types/projects";
import Head from "next/head";
import Layout from "../../../components/layout";
import { Container, Card } from "react-bootstrap";
import styles from "../../../../public/styles/Projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs } from "@fortawesome/free-solid-svg-icons";

const affStoryPayments: React.FC<{ projects: Projects[]; my_user_idkey: number }> = ({ projects, my_user_idkey }) => {
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Story Payments</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_project.jpeg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka "}>
          <h1>My Payments by Project</h1>
          <div className={styles.timeline}>
            {projects.map((project) => {
              return (
                <Card className={"mb-4 " + styles.card} key={project.idkey}>
                  <Card.Body className={styles.body}>
                    <Card.Title className={styles.title}>{project.name}</Card.Title>
                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>Budget : {project.amount + " €"}</Card.Subtitle>
                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>Summary : {project.summary}</Card.Subtitle>

                    <hr className={styles.separator} />
                    <Card.Subtitle className={"mb-2 text-muted " + styles.muted}>My Payments</Card.Subtitle>
                    {project.payments.map((payment) => {
                      if (payment.user_idkey === my_user_idkey) {
                        return (
                          <div>
                            <div className="row">
                              <p className="col-3">{payment.date_payment}</p>
                              <p className="col-3">{payment.amount} €</p>
                            </div>
                            <div className="row">
                              <p className="col">{payment.summary}</p>
                            </div>
                          </div>
                        );
                      }
                    })}

                    <hr className={styles.separator} />
                    <Card.Link href={"/projects/show/" + project.idkey}>
                      <FontAwesomeIcon icon={faCogs} /> Detail Project
                    </Card.Link>
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
export default affStoryPayments;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // dans le contexte on recupere email dans le query
  const session = await getSession(context);
  let my_user_idkey = 0;

  if (session) {
    const _projects = await findUserByEmail(String(session.user.email)).then((user) => {
      my_user_idkey = user.user_idkey;
      console.log(user.user_idkey, my_user_idkey);
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
