import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../../components/layout";
import Head from "next/head";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "../../../../public/styles/cardpayment.module.css"

//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
//port styles from "../../../../public/styles/Home.module.css";

const affCardPayment: React.FC<{}> = ({}) => {
  return (
  <>
    <Head>
        <title>Tout Compte Fait - Card Payment</title>
    </Head>
    <Layout>
      <Container className={"dontTouchPoka " + styles.creation}>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="d-flex">
            <h1>Transaction Payment</h1>
          </div>
        </div>
      </div>

      
      <Form method="POST" action="/projects/cardpayment/payment" className="mt-3 ml-5">
        
        <Form.Group>
          <Form.Label htmlFor="cardnumber">Card Number</Form.Label>
          
          <Form.Control
            required
            id="card"
            name="card"
            type="text"
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Control as="select" defaultValue="Choose...">
            <option>2020</option>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="security">ID Security</Form.Label>
          <Form.Control
            required
            id="security"
            name="security"
            type="text"
          />
        </Form.Group>



        <Form.Group className={styles.formpayment} as={Row}>
          <Form.Group>
            <Form.Label as="legend" column sm={2}>
            </Form.Label>
            
              <img src="/pictures/cards/mastercard.jpg" alt="mastercard"></img>
              <Form.Check
                type="radio"
                label="Mastercard"
                name="formHorizontalRadios1"
                id="formHorizontalRadios1"
                />
          </Form.Group>  
        
          <Form.Group>
            <Form.Label as="legend" column sm={2}>
            </Form.Label>
            
              <img src="/pictures/cards/googlepay.png" alt="googlepay"></img>
              <Form.Check
                type="radio"
                label="GooglePay"
                name="formHorizontalRadios1"
                id="formHorizontalRadios1"
                />
          </Form.Group> 
        
          <Form.Group>
            <Form.Label as="legend" column sm={2}>
            </Form.Label>
            
              <img src="/pictures/cards/bitcoin.png" alt="bitcoin"></img>
              <Form.Check
                type="radio"
                label="Bitcoin"
                name="formHorizontalRadios1"
                id="formHorizontalRadios1"
                />
          </Form.Group>
           
          <Form.Group>
            <Form.Label as="legend" column sm={2}>
            </Form.Label>
            
              <img src="/pictures/cards/paypal.png" alt="paypal"></img>
              <Form.Check
                type="radio"
                label="Paypal"
                name="formHorizontalRadios1"
                id="formHorizontalRadios1"
                />
          </Form.Group>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button className="mt-2" variant="primary" type="submit">
              Accept Payment
            </Button>
          </Col>
          </Form.Group>
      </Form>

        

      
      </Container>    
    </Layout>
  </>
  );
};
export default affCardPayment;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
