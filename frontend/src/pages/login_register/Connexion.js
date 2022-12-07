import React from "react";
import Main from "../../comp/log_reg/Main";

const Connexion = (props) => {
  //récupération du state token Id
  const userData = props.userData;
  const setUserData = props.setUserData;

  return (
    <div className="container-fluid h-vh-100 d-flex align-items-center justify-content-center d-inline-block bg-img-co">
      <Main
        signIn={true}
        signUp={false}
        userData={userData}
        setUserData={setUserData}
      />
    </div>
  );
};

export default Connexion;
