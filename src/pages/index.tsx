import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Layout from "../components/layout";
import Slideshow from "../components/slideshow";
import styles from "../../public/styles/Home.module.css";
import { findUserByEmail } from "../utils/users";
import { Container, Button } from "react-bootstrap";

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

            <div className={"row mt-3 " + styles.base_button}>
              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                <h3> Profile</h3>
                <p> Add description -> of the element  </p>
              </div>

              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>Start a new Project</h3>
                  <p> Add description -> of the element </p>
              </div>

              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>On going Projects</h3>
                  <p> Add List of last projects -> Or display "there is no project to displa" </p>
              </div>

              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>Feature to determine</h3>
                  <p>Feature to determine</p>
              </div>
            </div>
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
