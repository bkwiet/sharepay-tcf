import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../../public/styles/CreateProject.module.css";
// import App from "../../../components/stripeCard";
type Props = {
  session: Session;
  project_idkey: number;
  project_name: string;
  project_amount: number;
  project_solde: number;
};

const Registration: NextPage<Props> = ({ session, project_idkey, project_name, project_amount, project_solde }) => {
  const [payment, setPayment] = React.useState(0);
  const [summary, setSummary] = React.useState("");

  return (
    <>
      <Head>
        <title>Tout Compte Fait - Add User Payment</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/carte-bancaire-haut-de-gamme.jpg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka " + styles.creation}>
          {session && (
            <>
              <h1>Add a Payment</h1>
              <div>
                <h3>{project_name}</h3>
                <h3>Initial Budget {project_amount}</h3>
                <h3>It remains to pay {project_solde}</h3>
              </div>

              {/* <Form method="POST" action="/api/projects/payment" className="mt-3"> */}
              <Form method="POST" action="/projects/addpayment/cardpayment" className="mt-3">
                <Form.Group>
                  <Form.Label htmlFor="payment">Payment</Form.Label>
                  <Form.Control
                    required
                    id="payment"
                    name="payment"
                    type="number"
                    value={payment}
                    onChange={(e) => setPayment(parseInt(e.target.value))}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label htmlFor="summary">Summary</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    rows={3}
                    id="summary"
                    name="summary"
                    value={summary}
                    placeholder="Enter the summary of your project"
                    onChange={(e) => setSummary(e.target.value)}
                    type="textarea"
                  />
                </Form.Group>

                <Button className="mt-2" variant="primary" type="submit">
                  Transaction Card Payment
                </Button>
                {/* les donnees en dessous sont des données masquées pour le passage de paramétre à l'api */}
                <Form.Group className={styles.mail}>
                  <Form.Label htmlFor="param1"></Form.Label>
                  <Form.Control id="param1" name="param1" type="hidden" value={project_idkey} readOnly />

                  <Form.Label htmlFor="param2"></Form.Label>
                  <Form.Control id="param2" name="param2" type="hidden" value={String(session.user.email)} readOnly />
                </Form.Group>
                {/* fin des données masquees */}
              </Form>
            </>
          )}
        </Container>
        {/* <App></App> */}
      </Layout>
    </>
  );
};

export default Registration;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const project_idkey = context.query.project_idkey;
  const project_name = context.query.project_name;
  const project_amount = context.query.project_amount;
  const project_solde = context.query.project_solde;

  return {
    props: {
      session,
      project_idkey,
      project_name,
      project_amount,
      project_solde,
    },
  };
};
