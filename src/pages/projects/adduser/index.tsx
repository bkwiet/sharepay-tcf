import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../../public/styles/CreateProject.module.css";

type Props = {
  session: Session;
  project_idkey: number;
  project_name: string;
};

const Registration: NextPage<Props> = ({ session, project_idkey, project_name }) => {
  const [email, setEmail] = React.useState("");

  return (
    <>
      <Head>
        <title>Tout Compte Fait - Add User Project</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_adduser.jpg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka " + styles.creation}>
          {session && (
            <>
              <h1>Add a User on Project</h1>

              <Form method="POST" action="/api/projects/adduser" className="mt-3">
                <Form.Group>
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    required
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    placeholder="email of the new user"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Add User
                </Button>

                {/* les donnees en dessous sont des données masquées pour le passage de paramétre à l'api */}
                <Form.Group className={styles.mail}>
                  <Form.Label htmlFor="param1"></Form.Label>
                  <Form.Control id="param1" name="param1" type="hidden" value={project_idkey} readOnly />

                  <Form.Label htmlFor="param2"></Form.Label>
                  <Form.Control id="param2" name="param2" type="hidden" value={project_name} readOnly />

                  <Form.Label htmlFor="param3"></Form.Label>
                  <Form.Control id="param3" name="param3" type="hidden" value={String(session.user.email)} readOnly />
                </Form.Group>
                {/* fin des données masquees */}
              </Form>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};

export default Registration;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const project_idkey = context.query.project_idkey;
  const project_name = context.query.project_name;
  console.log("recup project_name", project_name);
  return {
    props: {
      session,
      project_idkey,
      project_name,
    },
  };
};
