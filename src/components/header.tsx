import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import Link from "next/link";
import { signin, signout, useSession } from "next-auth/client";
import styles from "../../public/styles/Header.module.css";

export const Header: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <header>
      <Navbar className={styles.nav} expand="lg" fixed="top">
        <Navbar.Brand className={styles.logo_brand} href="/">
          {" "}
          <img src="pictures/brand_logo.jpg" alt="brand_logo" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="tfc-navbar" />
        <Navbar.Collapse id="tfc-navbar">
          <Nav className={"mr-auto " + styles.navbar}>
            <Nav.Link href="#pricing">Start</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
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
                    <i className={"fas fa-user-circle mr-2 " + styles.avatar}></i>
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
