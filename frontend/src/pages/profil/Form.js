/* eslint-disable react/jsx-pascal-case */
import React, { Fragment } from "react";
import Header from "../../comp/UI/header/Header";
import FormProfil from "../../comp/profil/FormProfil";

const Form = (props) => {

  return (
    <Fragment>
      <Header userId={props.userId}></Header>
      <div className="d-flex flex-column align-items-center justify-content-center h-vh-90">
        <h2 className="mt-5 text-capitalize text-center">Remplir les données de votre Profil</h2>
      <FormProfil userData={props.userData}/>
      </div>
    </Fragment>
  );
};

export default Form;
