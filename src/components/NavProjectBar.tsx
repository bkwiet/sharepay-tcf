import React from "react";
import Link from "next/link";

const NavProjectBar: React.FC = ({}) => {
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
