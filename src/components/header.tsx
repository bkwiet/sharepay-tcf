import React from "react";
import NavBar from "../components/NavBar";
export const Header: React.FC = () => {
  return (
    <>
      <header>

        <nav>
          <p>
            {!session && (
              <a
                href="/api/auth/signin"
                onClick={(e) => {
                  e.preventDefault();
                  signin();
                }}
              >
                <button className="signInButton">Sign in</button>
              </a>
            )}
            {session && (
              <>
                <Link href="/profile">
                  <a>
                    <span style={{ backgroundImage: `url(${session.user.image})` }} className="avatar" />
                  </a>
                </Link>
                <span className="email">{session.user.email}</span>
                <a
                  href="/api/auth/signout"
                  onClick={(e) => {
                    e.preventDefault();
                    signout();
                  }}
                >
                  <button className="signOutButton">Sign out</button>
                </a>
              </>
            )}
          </p>
        </nav>

        <NavBar></NavBar>
        <nav> </nav>


        <style jsx>{``}</style>
      </header>
    </>
  );
};

export default Header;
