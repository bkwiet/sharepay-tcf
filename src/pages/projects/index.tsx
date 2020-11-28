import React from "react";
import { GetServerSideProps } from "next";
import { getSession, Session } from "next-auth/client";
import { findUserByEmail } from "../../utils/users";
import { Users } from "../../types/Users";
import Head from "next/head";
import Layout from "../../components/layout";
import { Container } from "react-bootstrap";
import styles from "../../../public/styles/CreateProject.module.css";

type Projects = {
  idkey: Number;
  name: string;
};

const ProjectIndex: React.FC<{ projects: Projects[] }> = ({ projects }) => {
  console.log("arrivee typeof projects", typeof projects);
  console.log(projects);

  return (
    <>
      <Head>
        <title>Tout Compte Fait - My Projects</title>
        <style>{`
          body {
            background-image: url("/pictures/background_project.jpeg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka " + styles.creation}>
          <h1>My projects</h1>
          {projects.map((project) => {
            return (
              <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch mb-5 text-dark" key={project.idkey}>
                <a href={"/projects/show/" + project.idkey}>
                  <p>{project.name}</p>
                </a>
              </div>
            );
          })}
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
    const user: Users = await findUserByEmail(String(session.user.email));

    let projects: { idkey: Number; name: string }[] = [];

    if (user.projects) {
      user.projects.map((project: { idkey: string; name: string }) => {
        projects.push({ idkey: project.idkey, name: project.name });
      });
    }
    console.log(projects);

    // Pass data to the page via props
    return {
      props: {
        projects: projects,
      },
    };
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
