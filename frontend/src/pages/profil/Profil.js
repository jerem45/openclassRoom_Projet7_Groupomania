/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmptyProfil from "../../comp/profil/EmptyProfil";
import ActiveProfil from "../../comp/profil/ActiveProfil";
import Header from "../../comp/UI/header/Header";

function Profil(props) {
  // le state de gestion de l'affichage

  const [displayProfil, setDisplayProfil] = useState([{ status: false }]);
  const [fetchData, setData] = useState([]);
  //récupération du state token Id
  const userData = props.userData;

    // recupération des states validation de formulaire de app sous forme de props
    const validateProfil=props.validateProfil  
    const setValidateProfil=props.setValidateProfil
    console.log("validateProfil depuis  PROFIL");
    console.log(validateProfil);

//recupération et traitement de la data utilisateur
function paramsProfil() {
  axios({
    method: "get",
    url: `${process.env.REACT_APP_URL}api/profil/${userData[1].id}`,

    headers: {
      Authorization: `Bearer ${userData[0].token}`,
    },
  })
    .then((res) => {
      function getDataUser() {
        const fetchInfoData = res.data;
        const newData = [...fetchData];
        newData[0] = fetchInfoData;
        setData(newData);
      }
      getDataUser();
      if (res.data.name === undefined) {
        const newDisplayProfil = [...displayProfil];
        newDisplayProfil[0].status = false;
        setDisplayProfil(newDisplayProfil);
      } else {
        const newDisplayProfil = [...displayProfil];
        newDisplayProfil[0].status = true;
        setDisplayProfil(newDisplayProfil);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

  //didMount
  useEffect(() => {
    paramsProfil();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //[displayProfil, fetchData, userData]

  if (displayProfil[0].status === false) {
    return (
         <div className="h-vh-100">
        <Header />
        <EmptyProfil />
        </div>
    );
  } else {
    return (
      
         <div className="d-flex justify-content-center align-items-center flex-column">
        <Header />
        <ActiveProfil 
        fetchData={fetchData} 
        validateProfil={validateProfil}  
        setValidateProfil={setValidateProfil} 
        userData={userData}
        paramsProfil={paramsProfil}
        />
         </div>
    );
  }
}

export default Profil;
