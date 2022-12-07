/* eslint-disable react/jsx-pascal-case */
import React from "react";
import Logo from "../../../img/logo.png"

const MainTitle = () => {
  return (
    <div>
      {/* <h1 className="text-primary-color text-align-center p-1">Groupomania</h1> */}
      <img src={Logo}alt="logo de l'entreprise groupomania" className="main_Logo"></img>
    </div>
  );
};

export default MainTitle;
