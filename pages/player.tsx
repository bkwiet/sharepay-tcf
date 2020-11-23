import React from "react";
import NavBar from "../components/NavBar";
import NavProjectBar from "../components/NavProjectBar";
import MainContainer from "../components/MainContainer";

const Player: NextPage<Props> = ({ accessToken }) => {
  return (
    <div>
      <NavBar />
      <div className="mainContainer">
        <NavProjectBar />
      </div>
    </div>
  );
};
export default Player;
