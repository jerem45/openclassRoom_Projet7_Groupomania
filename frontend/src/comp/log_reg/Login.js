/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./Form";
import axios from "axios";

const Login = (props) => {
  // Les states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [axiosData, setAxiosData] = useState(props.userData);


  //Récuperation props Token Id depuis app
  const setUserData = props.setUserData;

  //Récuperation des props utilitaires
  const url = `${process.env.REACT_APP_URL}api/auth/${props.regiLog}`;
  const navigate = useNavigate();
  const propsBtn = props.button;
  const propsTitle = props.title;

  //Requêtes axios envoyer de la data
  const handleLogin = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: url,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        function getDataUser() {
          const Token = res.data.token;
          const ID = res.data.userId;
          const newAxiosData = [...axiosData];

          newAxiosData[0].token = Token;
          newAxiosData[1].id = ID;
          setAxiosData(newAxiosData);
        }

        function redirectUrl() {
          navigate("home/");
        }
        getDataUser();
        redirectUrl();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange_email = (event) => {
    setEmail(event.target.value);
  };

  const handleChange_password = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Form
      onSubmit={(e) => handleLogin(e)}
      onChange_email={handleChange_email}
      onChange_password={handleChange_password}
      valueEmail={email}
      valuePassword={password}
      valueBtn={propsBtn}
      valueTitle={propsTitle}
      setUserData={setUserData}
      axiosData={axiosData}
    />
  );
};

export default Login;
