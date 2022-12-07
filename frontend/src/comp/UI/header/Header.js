/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { useNavigate } from "react-router-dom";
import MainTitle from "../titles/MainTitle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Button from "../button/Button";

const Header = (props) => {
  const homeUrl = "/home/";
  const profilUrl = "/profil/";
  const navigate = useNavigate();
  function redirectUrl() {
    navigate("/connexion/");
  }

  return (
    <div className="d-flex flex-row justify-content-evenly align-items-center container-fluid p-3 bg-white flex-wrap">
      <MainTitle />
      <div className="d-flex justify-content-center align-items-center fs-5 flex-wrap">
         <Link to={homeUrl}  className="me-3 nav-hover-link text-decoration-none">
          <FontAwesomeIcon icon={faHouse} className="icon text-secondary-color"></FontAwesomeIcon>
          <span className="ms-1 text-secondary-color">Home</span>
        </Link>

        <Link to={profilUrl} className="me-3 fs-5 nav-hover-link text-decoration-none">
          <FontAwesomeIcon icon={faUser} className="icon text-secondary-color"></FontAwesomeIcon>
          <span className="ms-1 text-secondary-color">Profil</span>
        </Link>

        <div className="p-1">
          <Button
            className="btn-secondary-color fs-6 fw-bold"
            value="Deconnexion"
            onClick={redirectUrl}
            Link
            to={"/connexion"}
          >
            {" "}
            <FontAwesomeIcon
              icon={faPowerOff}
              className="icon"
            ></FontAwesomeIcon>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
