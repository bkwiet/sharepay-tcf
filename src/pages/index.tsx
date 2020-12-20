import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getSession, Session } from "next-auth/client";
import Layout from "../components/layout";
import Slidehome from "../components/slidehome";
import styles from "../../public/styles/Home.module.css";
import { findUserByEmail } from "../utils/users";
import { Users } from "../types/users";
import { Container } from "react-bootstrap";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus, faProjectDiagram, faUserAstronaut, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";

type Props = {
  session: Session;
  user: Users;
};

const Home: NextPage<Props> = ({ session, user }) => {
  // console.log("inside home", user);
  //console.log("afficher le 1er projet pour le bouton AccesProjects", user.projects ,"------------------", user.projects[0])

  return (
    <>
      {!session ? (
        <>
          <Head>
            <title>Tout Compte Fait - Welcome</title>
            <style>{`         
              #peer nav { background-color: rgb(0 0 0 / 90%);
                          }
              #peer a {
                color: white !important;
            }
        `}</style>
          </Head>
          <Layout>
            <Slidehome />
          </Layout>
        </>
      ) : (
        <>
          <Head>
            <title>Tout Compte Fait - Homepage</title>
          </Head>
          <Layout>
            <Container className={"dontTouchPoka "}>
              <div className="marquee-rtl">
                <h1>
                  Welcome <span className={styles.username}>{user.username}</span>
                </h1>
              </div>

              <div className={"row mt-3 " + styles.base_button}>
                <Link href="/projects/create">
                  <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                    <h3>
                      <span className={styles.spinout}>
                        <FontAwesomeIcon icon={faFolderPlus} />
                      </span>
                      Start a new Project
                    </h3>
                    <p> Here, you can add a Project and assign it to your friends to start sharing your payments. </p>
                    <p>Start your journey now !</p>
                  </div>
                </Link>

                <Link href="/projects">
                  <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                    <h3>
                      <span className={styles.spinout}>
                        <FontAwesomeIcon icon={faProjectDiagram} />
                      </span>
                      On going Projects
                    </h3>
                    <p>List of all your active project, add a payment to your project, add a participant to your project</p>
                    <p>New feature comming soon : Add activities and share the dime by activities and particpant </p>
                  </div>
                </Link>

                <Link href="/profile">
                  <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                    <h3>
                      <span className={styles.spinout}>
                        <FontAwesomeIcon icon={faUserAstronaut} />
                      </span>
                      Profile
                    </h3>
                    <p>This feature will coming soon ! </p>
                    <p>You will have the possibility to update the informations about you and tell us more about you.</p>
                  </div>
                </Link>

                <Link href="/projects/storypayments">
                  <div className={"col-sm-12 col-md-5 mr-2 mb-2 " + styles.main_button}>
                    <h3>
                      <span className={styles.spinout}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} />
                      </span>
                      Payments Story
                    </h3>
                    <p>You will find the payment history for all your projects</p>
                  </div>
                </Link>
              </div>
            </Container>
          </Layout>
        </>
      )}
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
