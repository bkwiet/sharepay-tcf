import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../public/styles/Registration.module.css";
import { findUserByEmail } from "../../utils/users";
import { Sharepay_user } from "../../types/Users";

type Props = {
  session: Session;
};

const Registration: NextPage<Props> = ({ session }) => {
  const [username, setUsername] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phonenum, setPhonenum] = React.useState("");
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Registration</title>
      </Head>
      <Layout>
        <Container className={" " + styles.register}>
          {session && (
            <>
              <h1>Welcome</h1>
              <small>Lets start to register some informations about you</small>

              <Form method="POST" action="/api/auth/createnewuser" className="mt-3">
                <Form.Group className={styles.mail}>
                  <Form.Label htmlFor="user_email">Your Mail</Form.Label>
                  <Form.Control id="user_email" name="user_email" type="email" value={session.user.email} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="user_username">Username</Form.Label>

                  <Form.Control
                    id="user_username"
                    name="user_username"
                    type="text"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="user_firstname">Firstname</Form.Label>

                  <Form.Control
                    id="user_firstname"
                    name="user_firstname"
                    type="text"
                    value={firstname}
                    placeholder="Enter your firstname"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="user_lastname">Lastname</Form.Label>

                  <Form.Control
                    id="user_lastname"
                    name="user_lastname"
                    type="text"
                    value={lastname}
                    placeholder="Enter your lastname"
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="user_phonenum">Mobile n°</Form.Label>

                  <Form.Control
                    id="user_phonenum"
                    name="user_phonenum"
                    type="text"
                    value={phonenum}
                    placeholder="Enter your mobile number"
                    onChange={(e) => setPhonenum(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Register
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

  if (session) {
    // Dans le utils/users il faut retourner le bon type pour la promesse
    const user = await findUserByEmail(String(session.user.email));
    if (user.username) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    } else {
      return {
        props: {
          session,
        },
      };
    }
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
