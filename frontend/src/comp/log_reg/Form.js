import React from "react";
import Button from "../UI/button/Button";

const Form = (props) => {
  const setUserData = props.setUserData;
  const axiosData = props.axiosData;

  function sendUserData() {
    const newUserData = [...axiosData];
    newUserData[0].token = axiosData[0].token;
    newUserData[1].id = axiosData[1].id;
    setUserData(newUserData);
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
      <h2 className="fs-5 text-primary-color">{props.valueTitle}</h2>
      <form
        className="mb-1"
        action=""
        id="form__signIn"
        onSubmit={props.onSubmit}
      >
        <label htmlFor="email" className="form-label">Email</label>
        <input
        className="form-control"
          type="text"
          name="email"
          id="email"
          value={props.valueEmail}
          onChange={props.onChange_email}
        ></input>
        <p className="emailError"></p>
        <label htmlFor="password" className="form-label">Mot de passe </label>
        <input
        className="form-control"
          type="password"
          name="password"
          id="password"
          value={props.valuePassword}
          onChange={props.onChange_password}
        ></input>
        <p className="passwordError"></p>
        <br />
        <Button
          type={"submit"}
          className="btn-primary-color"
          value={props.valueBtn}
          onClick={() => sendUserData}
        ></Button>
      </form>
    </div>
  );
};

export default Form;
