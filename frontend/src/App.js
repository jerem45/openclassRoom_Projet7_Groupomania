import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./pages/login_register/Connexion";
import Home from "./pages/home/Home";
import Profil from "./pages/profil/Profil";
import Form from "./pages/profil/Form";
import "./styles/setting.scss"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App(props) {
  // -------------lES STATES----------------

  //state token + id
  const [userData, setUserData] = useState([{ token: "" }, { id: "" }]);

//state Profil complété
const [validateProfil,setValidateProfil] = useState([
  {status:false}
])

  // Le router
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Connexion userData={userData} setUserData={setUserData} />
            }
          />
          <Route
            path="*"
            element={
              <Connexion userData={userData} setUserData={setUserData} />
            }
          />
          <Route path="/home/" element={<Home userData={userData} validateProfil={validateProfil}/>} />

          <Route path="/profil/" element={<Profil userData={userData} validateProfil={validateProfil}  setValidateProfil={setValidateProfil}/>} />

          <Route
            path="/profil_form/"
            element={<Form userData={userData} setUserData={setUserData}/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
