import React from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import Link from "next/link";
import { Session, signin, signout } from "next-auth/client";
import styles from "../../public/styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCampground, faProjectDiagram, faQrcode, faPlusSquare, faHandHoldingUsd } from "@fortawesome/free-solid-svg-icons";

type Props = {
  session: Session | undefined | null;
  loading: boolean;
};
export const Header: React.FC<Props> = ({ session, loading }) => {
  return (
    <header>
      <Navbar className={styles.nav} expand="lg" fixed="top">
        <Navbar.Brand className={styles.logo_brand} href="/">
          {" "}
          <span>TCF</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="tfc-navbar" />
        <Navbar.Collapse id="tfc-navbar">
          <Nav className={"mr-auto " + styles.navbar}>
            {session && (
              <>
                <Nav.Link href={"/"}>
                  <FontAwesomeIcon icon={faCampground} /> Home
                </Nav.Link>
                <Nav.Link href={"/projects"}>
                  <FontAwesomeIcon icon={faProjectDiagram} /> My Projects
                </Nav.Link>
                <Nav.Link href={"/projects/create"}>
                  <FontAwesomeIcon icon={faPlusSquare} /> Start Project
                </Nav.Link>
                <Nav.Link href={"#"}>
                  <FontAwesomeIcon icon={faHandHoldingUsd} /> Payment
                </Nav.Link>
              </>
            )}
            <Nav.Link href="/us">
              <FontAwesomeIcon icon={faQrcode} /> `Bout Us
            </Nav.Link>
          </Nav>
          <Nav className={styles.navbar}>
            {!session && (
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
                href="/login"
              >
                Sign in
              </Nav.Link>
            )}

            {session && (
              <>
                <Dropdown className={styles.droppin}>
                  <Dropdown.Toggle variant="none" id="drp_profile">
                    <span className={styles.username}>{session.user.email}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item
                      onClick={(e) => {
                        e.preventDefault();
                        signout();
                      }}
                      href="logout"
                    >
                      Sign out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <style jsx>{``}</style>
    </header>
  );
};

export default Header;
