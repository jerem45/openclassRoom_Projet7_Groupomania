import React from "react";
import Form from "./Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const url = `${process.env.REACT_APP_URL}api/auth/${props.regiLog}`;
  const navigate = useNavigate();
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
        function redirectUrl() {
          navigate("connexion/");
          alert(
            "Félicitation pour votre Inscription, Merci de vous connecter a présent"
          );
          window.location.reload();
        }
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
      valueBtn={props.valueBtn}
      valueTitle={props.valueTitle}
    />
  );
};

export default Register;
