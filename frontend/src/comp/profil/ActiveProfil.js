/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ModifacationProfil from "../UI/modals/Modifacation_Profil";
const ActiveProfil = (props) => {

  //Récuperation du token et de 'Id de l'utilisateur
  const userData = props.userData
  //récupération des données utilisateur depuis le parent profil
  const fetchData = props.fetchData;
  console.log("fetchData depuis activeProfil");
  console.log(fetchData.imageUrl);

  const paramsProfil=props.paramsProfil
  // recupération des states validation de formulaire de app sous forme de props
  const validateProfil=props.validateProfil  
  const setValidateProfil=props.setValidateProfil
  console.log("validateProfil depuis  ACTIVEPROFIL");
  console.log(validateProfil);

  //Functio de modification du state validateProfil
  function isValid(){
   const newValidateProfil = [...validateProfil]
    newValidateProfil[0].status=true
    setValidateProfil(
      newValidateProfil
    )
  }

  useEffect(()=>{
    //mise a jour du state
   const upDateData =()=>isValid()
   upDateData()
  },[])

  //JSX
  return (
    <div className="container-fluid">
      <div className="container d-flex justify-content-center align-items-center flex-column">

        <ModifacationProfil userData={userData} paramsProfil={paramsProfil} fetchData={fetchData} title="Choisi le ou les champs à modifier"/>

        <div className="d-flex justify-content-center align-items-center flex-column my-3">
          <img src={fetchData[0].imageUrl} alt="avatar" className="img-profil-size"></img>
        </div>
        <div className="container d-flex justify-content-center align-items-center flex-row">
          <h2 className="text-capitalize">{fetchData[0].name}</h2>
         
        </div>
        <div className="container d-flex justify-content-center align-items-center flex-row">
          <h2 className="text-capitalize"><span className="fw-bold fst-italic text-primary-color fs-5">Poste : </span>
          <span className="fs-4">{fetchData[0].job}</span></h2>
         
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column my-3">
          <p className="text-justify"><span className="fw-bold text-primary-color">Votre Biographie :</span> {fetchData[0].bio}</p>
        </div> 
        <button type="button" className=" btn-primary-color mb-4" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Modifier Mon Profil
        </button>
      </div>  
    </div>
  );
};

export default ActiveProfil;
