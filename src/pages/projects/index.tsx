import React from "react";
import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { findUserByEmail } from "../../utils/users";
import { findProjectById } from "../../utils/projects";
import { Users } from "../../types/users";
import { Projects } from "../../types/projects";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";
import { Container, Card } from "react-bootstrap";
import styles from "../../../public/styles/Projects.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCogs, faUserPlus  } from "@fortawesome/free-solid-svg-icons";

const ProjectIndex: React.FC<{ projects: Projects[] }> = ({ projects }) => {
  console.log("Gimme", projects);
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
        <Container className={"dontTouchPoka "}>
          <h1>My projects</h1>
          <div className={styles.timeline}>
            {projects.map((project) => {
              return (
                <Card className={"mb-4 " + styles.card} key={project.idkey}>
                  <Card.Body className={styles.body}>
                    <Card.Subtitle className="mb-2 text-muted">Project name</Card.Subtitle>
                    <Card.Title className={styles.title}>{project.name}</Card.Title>
                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>
                      Creation date : To fix no creation date or end creation
                    </Card.Subtitle>
                    <Card.Subtitle className={"mb-2 text-muted " + styles.cupcup}>Participants : To add</Card.Subtitle>
                    <hr className={styles.separator} />
                    <Card.Subtitle className="mb-2 text-muted">Budget</Card.Subtitle>
                    <Card.Text>{project.amount + " €"}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">Summary</Card.Subtitle>
                    <Card.Text>{project.summary}</Card.Text>
                    <hr className={styles.separator} />
                    <Card.Link href={"/projects/show/" + project.idkey}>
                      {" "}
                      <FontAwesomeIcon icon={faCogs} /> Manage Project
                    </Card.Link>
                    <Card.Link href={"/projects/adduser"}>
                      <FontAwesomeIcon icon={faUserPlus} id="iconAddUser" /> Add User
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

export default ProjectIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // dans le contexte on recupere email dans le query

  const session = await getSession(context);

  if (session) {
    const _projects = await findUserByEmail(String(session.user.email)).then((user) => {
      return async () => Promise.all(user.projects.map(async (project) => await findProjectById(parseInt(project.idkey))));
    });

    const swap = await _projects();
    const projects = JSON.parse(JSON.stringify(swap));

    return {
      props: { projects },
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
