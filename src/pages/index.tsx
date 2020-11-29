import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import Layout from "../components/layout";
import Slideshow from "../components/slideshow";
import styles from "../../public/styles/Home.module.css";
import { findUserByEmail } from "../utils/users";
import { Container, Button } from "react-bootstrap";
import Link from "next/link";


const Home: NextPage = ({ session, user }) => {
  // console.log("inside home", user);
  //console.log("afficher le 1er projet pour le bouton AccesProjects", user.projects ,"------------------", user.projects[0])

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
            <div className="marquee-rtl">
                 <div>Welcome <span className={styles.username}>{user.username}</span></div>
            </div>
         

            <div className={"row mt-3 " + styles.base_button}>

            <Link href="/profile">

              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                <h3><i className="fas fa-campground"></i> Profile </h3>
                <p> Edit your Profile. </p>
              </div>
              </Link>
              <Link href={"/projects/createproject"}>

              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>Start a new Project </h3>
                  <p>Here, you can add a Project and assign it to your friends to start sharing your payments. </p>
              </div>
              </Link>
              <Link href={"/projects?email=" + session.user.email}>
              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>Access your Projects </h3>
                   <p> Add List of last projects -> Or display "there is no project to displa" </p>
              </div>
              </Link>
              <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                  <h3>Payments Story </h3>
                  <p>Consult your payments History.</p>
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
