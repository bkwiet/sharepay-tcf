import Head from "next/head";
import { GetServerSideProps } from "next";
import React from "react";
import { findUserByEmail } from "../../utils/users";
import Layout from "../../components/layout";
import { Container } from "react-bootstrap";

type Projects = {
  idkey: Number;
  name: string;
};

const listProject: React.FC<{ projects: Projects[] }> = ({ projects }) => {
  console.log("arrivee typeof projects", typeof projects);
  console.log(projects);

  return (
    <>
      <Head>
        <title>Tout Compte Fait - My projects</title>
      </Head>
      <Layout>
        <Container className="container">
          <h1>My projects</h1>
          {projects.map((project) => {
            return (
              <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch mb-5 text-dark" key={project.idkey}>
                <a href={"/projects/" + project.idkey}>
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
export default listProject;

// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // dans le contexte on recupere email dans le query
  const email = context.query.email;
  console.log("valeur de params/email = ", email);

  const user = await findUserByEmail(email);
  console.log(user);

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
};
