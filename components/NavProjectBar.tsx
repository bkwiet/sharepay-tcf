import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const NavProjectBar: React.FC = ({}) => {
  const router = useRouter();
  const styles = {
    link: {
      color: "grey",
    },
    active: {
      background: "rgba(221, 221, 221, 0.2)",
      color: "#FFF",
    },
  };

  return (
    <div className="navProjectBar">
      <ul>
        <button>Créer un nouveau Projet</button>
        <Link href="/player" passHref>
          <p>Projet 1</p>
        </Link>
        <Link href="/player" passHref>
          <p>Projet 2</p>
        </Link>
        <Link href="/player" passHref>
          <p>Projet 3</p>
        </Link>
      </ul>
    </div>
  );
};

export default NavProjectBar;
