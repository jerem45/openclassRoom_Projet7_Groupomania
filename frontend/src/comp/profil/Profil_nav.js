/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { Link } from "react-router-dom";

const Profil_nav = (props) => {
  const formUrl = "/profil_form/";
  return (
    <div className="co__navBar">
      <Link to={formUrl}>Modifier profil</Link>
    </div>
  );
};

export default Profil_nav;
