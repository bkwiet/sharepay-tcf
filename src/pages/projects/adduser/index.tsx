import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../../public/styles/CreateProject.module.css";

type Props = {
  session: Session;
};

const Registration: NextPage<Props> = ({ session }) => {
  const [email, setEmail] = React.useState("");
  
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Add User Project</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_create.jpeg") !important;
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

                <Form.Group className={styles.mail}>
                  <Form.Label htmlFor="project_idkey"></Form.Label>
                  <Form.Control id="project_idkey" name="uproject_idkey" type="email" value={session.user.email} readOnly />
                

                
                  <Form.Label htmlFor="user_email"></Form.Label>
                  <Form.Control id="user_email" name="user_email" type="email" value={session.user.email} readOnly />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Add User
                </Button>
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

  return {
    props: {
      session,
    },
  };
};
