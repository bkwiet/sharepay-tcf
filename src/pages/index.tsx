import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Layout from "../components/layout";
import Slideshow from "../components/slideshow";
import styles from "../../public/styles/Home.module.css";
import { findUserByEmail } from "../utils/users";
import { Container } from "react-bootstrap";

const Home: NextPage = ({ session, user }) => {
  // console.log("inside home", user);
  return (
    <>
      <Head>
        <title>Tout Compte Fait - Homepage</title>
      </Head>
      <Layout>
        {!session ? (
          <Slideshow />
        ) : (
          <Container className={styles.home}>
            <h1>
              Welcome <span className={styles.username}>{user.username}</span>
            </h1>
          </Container>
        )}
      </Layout>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  let user;
  if (session) {
    user = await findUserByEmail(String(session.user.email));
    const _user = JSON.parse(JSON.stringify(user));
    console.log(_user);
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
