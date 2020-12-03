import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Container, Form, Button } from "react-bootstrap";
import { findUserByEmail } from "../utils/users";

// type Profile = {
//   session: Session;
//   user: Users;
// };
const Profile = ({ user, session }) => {
  const [username, setUsername] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [phonenum, setPhonenum] = React.useState("");
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Profile</title>
      </Head>
      <Layout>
        <Container>
          <h1>Profile</h1>
          <small>
            Lets start to see and modify some informations about you
          </small>
          <Form
            method="UPDATE"
            action="/api/auth/updateprofile"
            className="mt-3"
          >
            <Form.Group>
              <Form.Label htmlFor="user_email">
                Your Mail : {user.email}
              </Form.Label>
              <Form.Control
                id="user_email"
                name="user_email"
                type="email"
                value={session.user.email || " "}
                readOnly
              />
            </Form.Group>

            <Form.Label htmlFor="user_username">
              Username : {user.username}
            </Form.Label>

            <Form.Control
              id="user_username"
              name="user_username"
              type="text"
              value={username}
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Form.Group>
              <Form.Label htmlFor="user_firstname">
                Firstname : {user.firstname}
              </Form.Label>

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
              <Form.Label htmlFor="user_lastname">
                Lastname : {user.lastname}
              </Form.Label>

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
              <Form.Label htmlFor="user_phonenum">
                Mobile n° {user.phonenum}
              </Form.Label>

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
        </Container>
      </Layout>
    </>
  );
};

export default Profile;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    const user = await findUserByEmail(String(session.user.email));
    const _user = JSON.parse(JSON.stringify(user));
    return {
      props: {
        session,
        user: _user,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
