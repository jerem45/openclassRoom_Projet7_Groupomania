import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Logo from "../../img/logo_co.png"

const Main = (props) => {

  //------------------Les States-------------

  const [signUp, setSignUp] = useState(props.signUp);
  const [signIn, setSignIn] = useState(props.signIn);

      //récupération du state token Id
      const userData = props.userData;
      const setUserData = props.setUserData;
   

  //--------------------Methods---------------

     //Creation du Toggle
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignUp(true);
      setSignIn(false);
    } else if (e.target.id === "login") {
      setSignUp(false);
      setSignIn(true);
    }
  };

  //-----------------------JSX-----------------

  return (
    <div className="container-connexion d-flex align-items-center justify-content-center flex-column p-3">
      <img src={Logo} alt="logo de l'entreprise Groupomania en forma png" className="logo_co"></img>
      <ul className="container-fluid d-flex align-items-center justify-content-center flex-row">
        <li
          onClick={handleModals}
          id="login"
          className="p-1 fw-bold cursor-pointer"
        >
          Connexion
        </li>
        <li
          onClick={handleModals}
          id="register"
          className="ms-2 p-1 fw-bold cursor-pointer"
        >
          Inscription
        </li>
      </ul>
      {signUp && (
        <Register
          valueBtn="S'inscrire"
          valueTitle="Inscription"
          regiLog="register"
        />
      )}
      {signIn && (
        <Login
          title="Connexion"
          button="Se connecter"
          regiLog="login"
          access={props.access}
          setAccess={props.setAccess}
          userData={userData}
          setUserData={setUserData} 
          
        />
      )}
    </div>
  );
};

export default Main;
