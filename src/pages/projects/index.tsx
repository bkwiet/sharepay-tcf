import { GetServerSideProps } from 'next'
import React from "react";
import { findUserByEmail } from "../../utils/users"
import Layout from "../../components/layout";

type Projects = {
  idkey: string;
  name: string;
}

const listProject: React.FC<{projects: Projects[]}> = ({ projects }) => {
  console.log("arrivee typeof projects", typeof projects);
  console.log(projects);

  return (
    <Layout>
      <div className="container">
        
        
            {projects.map((project) => {
              return (
                <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch mb-5"
                key={project.idkey}>
                    <a href={"/projects/"+project.idkey}>
                      <p>{project.name}</p>
                    </a>
                </div>
              )
            }
            )}
      </div>
    </Layout>
  )
}
export default listProject;


// This gets called on every request
export const getServerSideProps: GetServerSideProps = async (context) => {
  // dans le contexte on recupere email dans le query
  const email = context.query.email;
  console.log("valeur de params/email = ",email);

  const user = await findUserByEmail(email);
  console.log(user);

  let projects: { idkey: string; name: string; }[] = [];

  user.projects.map( (project: { idkey: string; name: string; })  => {
    projects.push({idkey:project.idkey, name:project.name});
  });
  console.log(projects);

  // Pass data to the page via props
  return { 
    props: { 
      projects : projects
      
    }
  };
}
