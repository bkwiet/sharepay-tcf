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
  const [name, setName] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [amount, setAmount] = React.useState(0.0);

  return (
    <>
      <Head>
        <title>Tout Compte Fait - New Project</title>
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
              <h1>Create a new project</h1>

              <Form method="POST" action="/api/projects/createproject" className="mt-3">
                <Form.Group>
                  <Form.Label htmlFor="name">Name</Form.Label>
                  <Form.Control
                    required
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    placeholder="Name of your project"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="amount">Budget €</Form.Label>
                  <Form.Control
                    id="amount"
                    min="0.0"
                    step="any"
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="summary">Summary</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={6}
                    id="summary"
                    name="summary"
                    value={summary}
                    placeholder="Enter the summary of your project"
                    onChange={(e) => setSummary(e.target.value)}
                    type="textarea"
                  />
                </Form.Group>

                <Form.Group className={styles.mail}>
                  <Form.Label htmlFor="user_email">Your Mail</Form.Label>
                  <Form.Control id="user_email" name="user_email" type="email" value={session.user.email} readOnly />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Create project
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
