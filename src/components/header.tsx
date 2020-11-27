import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { Session, signin, signout } from "next-auth/client";
import styles from "../../public/styles/Header.module.css";

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
            {session && <Nav.Link href={"/projects?email=" + session.user.email}>Projects</Nav.Link>}
            <Nav.Link href="#features">Contact</Nav.Link>
          </Nav>
          <Nav className={styles.navbar}>
            {!session && (
              <Link href="/api/auth/signin">
                <Nav.Link
                  onClick={(e) => {
                    e.preventDefault();
                    signin();
                  }}
                  className="signInButton"
                  href="login"
                >
                  Sign in
                </Nav.Link>
              </Link>
            )}

            {session && (
              <>
                <Link href="/profile" passHref>
                  <Nav.Link>
                    <span className={styles.username}>{session.user.email}</span>
                  </Nav.Link>
                </Link>

                <Link href="/api/auth/signout">
                  <Nav.Link
                    onClick={(e) => {
                      e.preventDefault();
                      signout();
                    }}
                    className="signOutButton"
                    href="logout"
                  >
                    Sign out
                  </Nav.Link>
                </Link>
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
