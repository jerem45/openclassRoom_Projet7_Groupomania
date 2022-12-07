import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons"

const EmptyProfil = (props) => {

  const profilFormUrl = "/profil_form/";
  return (
    <div className='container h-vh-60 mt-4 d-flex align-items-center  justify-content-center flex-column'>
        <span className="fst-italic fw-bold text-center text-secondary-color">
        Pour poster des messages merci de mettre à jour votre profil
           <span className='fs-6 text-decoration-none '><Link to={profilFormUrl} className="text-primary-color"> Modifier Mon Profil</Link>
          </span> 
        </span> 
        <FontAwesomeIcon icon={faUserEdit} className="profil-icon"></FontAwesomeIcon>
      </div>
  );
};

export default EmptyProfil;
