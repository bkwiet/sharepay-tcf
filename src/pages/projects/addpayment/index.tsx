import React from "react";
import { getSession, Session } from "next-auth/client";
import Layout from "../../../components/layout";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Button, Container, Form } from "react-bootstrap";
import styles from "../../../../public/styles/CreateProject.module.css";
import getStripe, { formatAmountForDisplay, API_fetchPostJSON, CURRENCY } from "../../../utils/stripe";

type Props = {
  session: Session;
  project_idkey: number;
  project_name: string;
  project_amount: number;
  project_solde: number;
};

console.log("Project pub", process.env.STRIP_PUB);
console.log("Project sec", process.env.STRIP_SEC);

const Registration: NextPage<Props> = ({ session, project_idkey, project_name, project_amount, project_solde }) => {
  const [payment, setPayment] = React.useState(0);
  const [summary, setSummary] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await API_fetchPostJSON("/api/checkout", {
      amount: payment,
      idkey: project_idkey,
      email: session.user.email,
      summary: summary,
    });

    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }

    const stripe = await getStripe();

    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    });
    console.warn(error.message);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Tout Compte Fait - Add User Payment</title>
        <style>{`
          html,
          body {
            background-image: url("/pictures/background_checkout.jpg") !important;
          }
        `}</style>
      </Head>
      <Layout>
        <Container className={"dontTouchPoka " + styles.creation}>
          <div className={"dontTouchMoney"}>
            {session && (
              <>
                <h1>Add a Payment</h1>
                <div>
                  <p>
                    Project name : <span className="infoxmation">{project_name}</span>
                  </p>
                  <p>
                    Initial Budget : <span className="infoxmation">{formatAmountForDisplay(project_amount, CURRENCY)}</span>
                  </p>
                  <p>
                    It remains to pay : <span className="infoxmation">{formatAmountForDisplay(project_solde, CURRENCY)}</span>
                  </p>
                </div>

                <Form method="POST" onSubmit={handleSubmit} className="mt-3">
                  <Form.Group>
                    <Form.Label htmlFor="payments">Payment</Form.Label>
                    <Form.Control
                      required
                      id="payments"
                      name="paymentw"
                      type="number"
                      min="0"
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
                      placeholder="Enter the summary for this payment"
                      onChange={(e) => setSummary(e.target.value)}
                      type="textarea"
                    />
                  </Form.Group>
                  *You will be redirect to Stripe.com to finish the transaction
                  <Button className="mt-2" variant="primary" type="submit" disabled={loading}>
                    Pay {formatAmountForDisplay(payment, CURRENCY)}
                  </Button>
                </Form>
              </>
            )}
          </div>
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
